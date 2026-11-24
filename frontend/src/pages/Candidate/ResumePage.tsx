import { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { FileText, FileUp, CheckCircle2, Sparkles, Trash2, UploadCloud, ShieldCheck } from 'lucide-react';
import { PageHeader } from '../../components/common/PageHeader';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { resumeService } from '../../services/resumeService';
import type { ResumeAnalysis } from '../../types';
import { validateResumeFile } from '../../features/resume/fileRules';

export function ResumePage() {
  const [analysis, setAnalysis] = useState<ResumeAnalysis | null>(null);
  const mutation = useMutation({ mutationFn: resumeService.upload, onSuccess: (result) => { setAnalysis(result); toast.success('Resume analysed successfully.'); }, onError: (error) => toast.error(error instanceof Error ? error.message : 'Upload failed.') });
  const onDrop = (files: File[]) => {
    const file = files[0];
    if (!file) return;
    const validationError = validateResumeFile(file);
    if (validationError) { toast.error(validationError); return; }
    mutation.mutate(file);
  };
  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({ onDrop, multiple: false, noClick: true, accept: { 'application/pdf': ['.pdf'], 'application/msword': ['.doc'], 'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'] } });

  return <><PageHeader eyebrow="PROFILE & RESUME" title="Your resume" description="Upload your latest resume and let the platform identify your skills and experience." />
    <div className="resume-layout"><div className="resume-main"><Card className={`upload-card ${isDragActive ? 'drag-active' : ''}`}><div {...getRootProps()} className="drop-zone"><input {...getInputProps()} /><div className="upload-icon"><UploadCloud size={25} /></div><h2>{isDragActive ? 'Drop your resume here' : 'Upload your resume'}</h2><p>Drag and drop your file here, or browse from your device.</p><Button onClick={open} loading={mutation.isPending}><FileUp size={16} /> Choose a file</Button><span className="file-rules">PDF, DOC or DOCX · Maximum 5 MB</span></div></Card>
      {analysis && <Card className="analysis-card"><div className="card-heading"><div><div className="eyebrow">AI RESUME ANALYSIS</div><h2>Here’s what we found</h2></div><Badge tone="green"><CheckCircle2 size={12} /> Analysed</Badge></div><div className="uploaded-file"><div className="file-icon"><FileText size={21} /></div><div><strong>{analysis.fileName}</strong><span>Uploaded {analysis.uploadedAt}</span></div><button className="icon-button" onClick={() => setAnalysis(null)} title="Clear result"><Trash2 size={16} /></button></div><div className="analysis-summary"><div className="eyebrow">PROFILE SUMMARY</div><p>{analysis.summary}</p><div className="experience-chip"><Sparkles size={14} /> {analysis.experience}</div></div><div className="skills-heading"><h3>Detected skills</h3><span>{analysis.skills.length} skills identified</span></div><div className="detected-skills">{analysis.skills.map((skill) => <Badge key={skill} tone="blue">{skill}</Badge>)}</div></Card>}
    </div><div className="resume-aside"><Card className="resume-info-card"><div className="round-icon"><ShieldCheck size={19} /></div><h3>Your resume, handled thoughtfully.</h3><p>Your document is used to identify skills and help find relevant job opportunities. Keep personal information accurate and up to date.</p><div className="info-divider" /><div className="info-row"><CheckCircle2 size={15} /> Private document handling</div><div className="info-row"><CheckCircle2 size={15} /> Skill-based job matching</div><div className="info-row"><CheckCircle2 size={15} /> Clear match insights</div></Card><Card className="resume-checklist"><div className="eyebrow">RESUME CHECKLIST</div><h3>Make every detail count</h3>{['Use a clear, readable format', 'Include relevant technical skills', 'Add projects and achievements', 'Keep contact information current'].map((item) => <div className="checklist-item" key={item}><span><CheckCircle2 size={15} /></span>{item}</div>)}</Card></div></div>
  </>;
}
