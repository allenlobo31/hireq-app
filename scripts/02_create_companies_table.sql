-- Create companies table
CREATE TABLE IF NOT EXISTS public.companies (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  logo_url TEXT,
  description TEXT,
  industry TEXT,
  location TEXT,
  website TEXT,
  min_package INTEGER,
  max_package INTEGER,
  openings INTEGER DEFAULT 0,
  required_skills TEXT[], -- Array of required skills
  recruiting_areas TEXT[], -- Array of recruiting areas/departments
  company_size TEXT,
  founded_year INTEGER,
  benefits TEXT[],
  requirements JSONB, -- Store detailed requirements as JSON
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create applications table to track CV submissions to companies
CREATE TABLE IF NOT EXISTS public.applications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  cv_id UUID REFERENCES public.cvs(id) ON DELETE CASCADE NOT NULL,
  company_id UUID REFERENCES public.companies(id) ON DELETE CASCADE NOT NULL,
  skill_match_percentage INTEGER CHECK (skill_match_percentage >= 0 AND skill_match_percentage <= 100),
  matched_skills TEXT[],
  missing_skills TEXT[],
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'reviewed', 'shortlisted', 'rejected')),
  applied_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, cv_id, company_id)
);

-- Enable Row Level Security
ALTER TABLE public.companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.applications ENABLE ROW LEVEL SECURITY;

-- Create policies for companies (public read access)
CREATE POLICY "Anyone can view companies" ON public.companies
  FOR SELECT USING (true);

-- Create policies for applications
CREATE POLICY "Users can view own applications" ON public.applications
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own applications" ON public.applications
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Insert sample companies
INSERT INTO public.companies (name, logo_url, description, industry, location, min_package, max_package, openings, required_skills, recruiting_areas, company_size, founded_year, benefits) VALUES
('TechCorp Solutions', '/placeholder.svg?height=64&width=64', 'Leading technology solutions provider specializing in enterprise software development and digital transformation.', 'Technology', 'San Francisco, CA', 80000, 150000, 15, ARRAY['JavaScript', 'React', 'Node.js', 'Python', 'AWS'], ARRAY['Frontend Development', 'Backend Development', 'DevOps'], '500-1000', 2015, ARRAY['Health Insurance', 'Remote Work', '401k', 'Stock Options']),

('InnovateLabs AI', '/innovatelabs-ai-logo.png', 'Cutting-edge AI research company developing next-generation machine learning solutions for healthcare and finance.', 'Artificial Intelligence', 'Boston, MA', 90000, 180000, 8, ARRAY['Python', 'TensorFlow', 'PyTorch', 'Machine Learning', 'Data Science'], ARRAY['AI Research', 'Data Science', 'Machine Learning Engineering'], '100-500', 2018, ARRAY['Health Insurance', 'Research Budget', 'Conference Attendance', 'Flexible Hours']),

('GlobalTech Industries', '/globaltech-industries-logo.png', 'Multinational corporation providing comprehensive IT services and consulting to Fortune 500 companies worldwide.', 'IT Services', 'New York, NY', 70000, 140000, 25, ARRAY['Java', 'Spring Boot', 'Microservices', 'Docker', 'Kubernetes'], ARRAY['Software Engineering', 'System Architecture', 'Cloud Solutions'], '1000+', 2008, ARRAY['Health Insurance', 'Dental', 'Vision', 'Paid Time Off', 'Training Programs']),

('DataFlow Analytics', '/placeholder.svg?height=64&width=64', 'Specialized data analytics firm helping businesses make data-driven decisions through advanced analytics and visualization.', 'Data Analytics', 'Austin, TX', 75000, 130000, 12, ARRAY['SQL', 'Python', 'R', 'Tableau', 'Power BI', 'Statistics'], ARRAY['Data Analysis', 'Business Intelligence', 'Data Visualization'], '50-100', 2020, ARRAY['Health Insurance', 'Remote Work', 'Professional Development', 'Bonus Program']),

('CloudNine Systems', '/placeholder.svg?height=64&width=64', 'Cloud infrastructure specialists providing scalable solutions for modern businesses and startups.', 'Cloud Computing', 'Seattle, WA', 85000, 160000, 10, ARRAY['AWS', 'Azure', 'GCP', 'Terraform', 'Docker', 'Kubernetes'], ARRAY['Cloud Architecture', 'DevOps', 'Infrastructure'], '200-500', 2017, ARRAY['Health Insurance', 'Stock Options', 'Unlimited PTO', 'Learning Budget']),

('NextGen Startups', '/placeholder.svg?height=64&width=64', 'Dynamic startup incubator fostering innovation in fintech, healthtech, and edtech sectors.', 'Startup Incubator', 'Palo Alto, CA', 60000, 120000, 20, ARRAY['React', 'Node.js', 'MongoDB', 'GraphQL', 'TypeScript'], ARRAY['Full Stack Development', 'Product Development', 'UI/UX Design'], '10-50', 2021, ARRAY['Equity Participation', 'Flexible Hours', 'Startup Environment', 'Growth Opportunities']);
