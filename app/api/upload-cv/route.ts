import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { type NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from 'uuid';
// The 'pdf-parse' static import is removed from here

// Define the type for the data you'll be inserting into the 'cvs' table
interface CvData {
  user_id: string;
  file_name: string;
  file_url: string;
  specialization: string;
  skills: string[];
  experience: any[];
  projects: any[];
  education: any[];
  created_at: string;
}

export async function POST(request: NextRequest) {
  try {
    const supabase = createRouteHandlerClient({ cookies });

    // Check if the user is authenticated
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get("file") as File;
    const specialization = (formData.get("specialization") as string) || "General";

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const fileExtension = file.name.split('.').pop()?.toLowerCase();
    // Generate a unique filename to prevent conflicts
    const uniqueFileName = `${uuidv4()}.${fileExtension}`;
    const bucketName = 'cvs'; // The name of your Supabase Storage bucket

    // Upload the file to Supabase Storage
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from(bucketName)
      .upload(uniqueFileName, file, {
        cacheControl: '3600',
        upsert: false,
      });

    if (uploadError) {
      console.error("Supabase storage upload error:", uploadError);
      return NextResponse.json({ error: "Failed to upload file to storage" }, { status: 500 });
    }

    // Get the public URL for the uploaded file
    const { data: { publicUrl } } = supabase.storage
      .from(bucketName)
      .getPublicUrl(uniqueFileName);

    let fileContent = '';
    // Use the correct method to parse file content based on its type
    if (fileExtension === 'pdf') {
      const fileBuffer = await file.arrayBuffer();
      // FIX: Use a dynamic import to avoid module errors in Next.js
      const { default: pdf } = await import('pdf-parse');
      const pdfData = await pdf(Buffer.from(fileBuffer));
      fileContent = pdfData.text;
    } else {
      // For other file types, handle them differently or default to text
      fileContent = await file.text();
    }

    const cvData: CvData = {
      user_id: user.id,
      file_name: file.name,
      file_url: publicUrl, // Store the public URL in your database
      specialization: specialization,
      skills: extractSkills(fileContent),
      experience: extractExperience(fileContent),
      projects: extractProjects(fileContent),
      education: extractEducation(fileContent),
      created_at: new Date().toISOString(),
    };

    // Insert the CV data (including the URL) into your 'cvs' table
    const { data, error } = await supabase.from("cvs").insert([cvData]).select().single();

    if (error) {
      console.error("Database insert error:", error);
      return NextResponse.json({ error: "Failed to save CV data" }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      message: "CV uploaded and analyzed successfully",
      cv_id: (data as any).id, // Casting to any to access the id
      file_url: publicUrl,
    });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// These simplified functions are fine as they are
function extractSkills(content: string): string[] {
  // ... (your existing logic)
  const skillKeywords = [
    "JavaScript", "Python", "React", "Node.js", "SQL",
    "AWS", "Docker", "TypeScript", "HTML", "CSS",
  ];
  return skillKeywords.filter((skill) => content.toLowerCase().includes(skill.toLowerCase()));
}

function extractExperience(content: string): any[] {
  // ... (your existing logic)
  return [{ company: "Extracted Company", position: "Extracted Position", duration: "2020 - Present", description: "Experience extracted from CV content" }];
}

function extractProjects(content: string): any[] {
  // ... (your existing logic)
  return [{ name: "Extracted Project", description: "Project details extracted from CV", technologies: extractSkills(content).slice(0, 3) }];
}

function extractEducation(content: string): any[] {
  // ... (your existing logic)
  return [{ degree: "Extracted Degree", institution: "Extracted Institution", year: "2020" }];
}