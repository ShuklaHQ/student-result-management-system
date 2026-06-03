import { BrowserRouter, Routes, Route, useNavigate } from 'react-router';
import { GraduationCap, ClipboardEdit, LayoutDashboard, FileText, BookOpen, Download, Settings, LogOut, Bell, TrendingUp, ChevronDown, Eye, EyeOff, Check, CheckCircle, AlertTriangle, Users, BookMarked, FileBarChart, BarChart3, Lock, ArrowLeft, Edit2 } from 'lucide-react';
import { useState, type ReactNode } from 'react';

function getGradeStyle(grade: string): { background: string; color: string } {
  switch (grade) {
    case 'A+': return { background: 'rgba(16,185,129,0.15)', color: '#10B981' };
    case 'A':  return { background: 'rgba(16,185,129,0.12)', color: '#10B981' };
    case 'B+': return { background: 'rgba(99,102,241,0.15)', color: '#6366F1' };
    case 'B':  return { background: 'rgba(139,92,246,0.15)', color: '#8B5CF6' };
    case 'C':  return { background: 'rgba(245,158,11,0.15)', color: '#F59E0B' };
    case 'D':  return { background: 'rgba(239,68,68,0.15)', color: '#EF4444' };
    case 'F':  return { background: 'rgba(153,27,27,0.2)', color: '#EF4444' };
    default:   return { background: 'rgba(156,163,175,0.15)', color: '#9CA3AF' };
  }
}

function LandingPage() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen relative" style={{ background: '#0A0F1E', fontFamily: 'Inter, sans-serif' }}>
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] opacity-8"
             style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.15) 0%, rgba(139,92,246,0.1) 50%, transparent 100%)' }} />
      </div>
      <div className="absolute top-8 left-8 flex items-center gap-3">
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
          <path d="M16 4L8 8V16L16 20L24 16V8L16 4Z" stroke="#6366F1" strokeWidth="2" fill="rgba(99,102,241,0.1)" />
          <path d="M16 12L12 14V18L16 20L20 18V14L16 12Z" stroke="#8B5CF6" strokeWidth="2" fill="rgba(139,92,246,0.1)" />
        </svg>
        <span className="text-white font-semibold text-base">SRMS</span>
      </div>
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-8">
        <div className="text-center mb-12">
          <div className="uppercase text-xs tracking-widest mb-4" style={{ color: '#8B5CF6', letterSpacing: '0.08em' }}>ACADEMIC PORTAL</div>
          <h1 className="font-bold mb-4" style={{ fontSize: '56px', color: '#F9FAFB', letterSpacing: '-0.04em', lineHeight: '1.1' }}>
            Your academic record,<br />clearly owned.
          </h1>
          <p className="text-lg" style={{ color: '#9CA3AF' }}>Secure, role-based access to results, grades, and transcripts.</p>
        </div>
        <div className="flex gap-6 w-full max-w-[760px] mt-12">
          <div className="flex-1 rounded-2xl p-8 transition-all duration-300 hover:-translate-y-0.5 cursor-pointer group"
               style={{ background: '#111827', border: '1px solid rgba(255,255,255,0.06)', borderLeft: '3px solid #6366F1' }}
               onClick={() => navigate('/login/student')}>
            <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-6" style={{ background: 'rgba(99,102,241,0.15)' }}>
              <GraduationCap size={24} style={{ color: '#6366F1' }} strokeWidth={1.5} />
            </div>
            <h3 className="text-xl font-semibold mb-2" style={{ color: '#F9FAFB' }}>Student Portal</h3>
            <p className="text-sm mb-6" style={{ color: '#9CA3AF' }}>View your results, GPA, and download official mark sheets.</p>
            <button className="w-full h-12 rounded-xl font-semibold transition-all group-hover:shadow-lg" style={{ background: '#6366F1', color: 'white' }}>
              Continue as Student →
            </button>
          </div>
          <div className="flex-1 rounded-2xl p-8 transition-all duration-300 hover:-translate-y-0.5 cursor-pointer group"
               style={{ background: '#111827', border: '1px solid rgba(255,255,255,0.06)', borderLeft: '3px solid #8B5CF6' }}
               onClick={() => navigate('/login/teacher')}>
            <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-6" style={{ background: 'rgba(139,92,246,0.15)' }}>
              <ClipboardEdit size={24} style={{ color: '#8B5CF6' }} strokeWidth={1.5} />
            </div>
            <h3 className="text-xl font-semibold mb-2" style={{ color: '#F9FAFB' }}>Faculty Portal</h3>
            <p className="text-sm mb-6" style={{ color: '#9CA3AF' }}>Enter marks, manage subject results, and review student performance.</p>
            <button className="w-full h-12 rounded-xl font-semibold transition-all group-hover:shadow-lg" style={{ background: '#8B5CF6', color: 'white' }}>
              Continue as Teacher →
            </button>
          </div>
        </div>
        <div className="mt-8 text-sm" style={{ color: '#4B5563' }}>
          <button onClick={() => navigate('/login/admin')} className="hover:underline">Administrator? Contact your institution's IT cell.</button>
        </div>
      </div>
    </div>
  );
}

function LoginPage({ role }: { role: 'student' | 'teacher' | 'admin' }) {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const config = {
    student: { color: '#6366F1', icon: <GraduationCap size={32} />, title: 'Student Portal', subtitle: 'Sign in to access your results', route: '/dashboard/student' },
    teacher: { color: '#8B5CF6', icon: <ClipboardEdit size={32} />, title: 'Faculty Portal', subtitle: 'Sign in to manage results', route: '/dashboard/teacher' },
    admin:   { color: '#F59E0B', icon: <Lock size={32} />, title: 'Admin Portal', subtitle: 'Sign in to manage system', route: '/dashboard/admin' },
  }[role];
  return (
    <div className="min-h-screen flex items-center justify-center px-8" style={{ background: '#0A0F1E', fontFamily: 'Inter, sans-serif' }}>
      <div className="w-full max-w-[420px]">
        <div className="rounded-2xl p-px" style={{ background: 'linear-gradient(135deg, #6366F1, #8B5CF6)' }}>
          <div className="rounded-2xl p-10" style={{ background: '#111827', boxShadow: '0 0 80px rgba(99,102,241,0.12)' }}>
            <button onClick={() => navigate('/')} className="flex items-center gap-2 mb-8 text-sm hover:opacity-80 transition-opacity" style={{ color: '#9CA3AF' }}>
              <span>←</span><span>{config.title}</span>
            </button>
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ background: `${config.color}26`, color: config.color }}>
                {config.icon}
              </div>
            </div>
            <h2 className="text-3xl font-bold text-center mb-2" style={{ color: '#F9FAFB' }}>Welcome back</h2>
            <p className="text-center mb-8" style={{ color: '#9CA3AF', fontSize: '14px' }}>{config.subtitle}</p>
            <div className="mb-6">
              <label className="block text-xs uppercase mb-2" style={{ color: '#9CA3AF', letterSpacing: '0.05em' }}>Email Address</label>
              <input type="email" placeholder="student@university.edu" className="w-full h-12 px-4 rounded-xl transition-all"
                style={{ background: '#1F2937', border: '1px solid rgba(255,255,255,0.08)', color: '#F9FAFB', outline: 'none' }}
                onFocus={(e) => e.target.style.border = `2px solid ${config.color}`}
                onBlur={(e) => e.target.style.border = '1px solid rgba(255,255,255,0.08)'} />
            </div>
            <div className="mb-4">
              <label className="block text-xs uppercase mb-2" style={{ color: '#9CA3AF', letterSpacing: '0.05em' }}>Password</label>
              <div className="relative">
                <input type={showPassword ? 'text' : 'password'} placeholder="••••••••" className="w-full h-12 px-4 pr-12 rounded-xl transition-all"
                  style={{ background: '#1F2937', border: '1px solid rgba(255,255,255,0.08)', color: '#F9FAFB', outline: 'none' }}
                  onFocus={(e) => e.target.style.border = `2px solid ${config.color}`}
                  onBlur={(e) => e.target.style.border = '1px solid rgba(255,255,255,0.08)'} />
                <button onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2" style={{ color: '#9CA3AF' }}>
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
            <div className="flex items-center justify-between mb-6">
              <label className="flex items-center gap-2 cursor-pointer text-sm" style={{ color: '#9CA3AF' }}>
                <input type="checkbox" className="w-4 h-4 rounded" style={{ accentColor: config.color }} />
                Remember me
              </label>
              <button className="text-sm hover:underline" style={{ color: config.color }}>Forgot password?</button>
            </div>
            <button onClick={() => navigate(config.route)} className="w-full h-12 rounded-xl font-semibold mb-6"
              style={{ background: 'linear-gradient(135deg, #6366F1, #8B5CF6)', color: 'white' }}>Sign In</button>
            <div className="relative mb-6">
              <div className="absolute inset-0 flex items-center"><div className="w-full" style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }} /></div>
              <div className="relative flex justify-center text-xs"><span className="px-2" style={{ background: '#111827', color: '#9CA3AF' }}>or</span></div>
            </div>
            <button onClick={() => navigate(config.route)} className="w-full h-12 rounded-xl font-semibold mb-6 hover:bg-white/5 transition-colors"
              style={{ border: '1px solid rgba(255,255,255,0.1)', color: '#F9FAFB' }}>Use demo account</button>
            <div className="text-center text-sm" style={{ color: '#9CA3AF' }}>
              <button onClick={() => navigate('/')} className="hover:underline">Not a {role}? Switch role →</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Sidebar({ role, activeSection, onNavChange, accentColor, userName, userMeta }: {
  role: string;
  activeSection: string;
  onNavChange: (id: string) => void;
  accentColor: string;
  userName: string;
  userMeta: string;
}) {
  const navigate = useNavigate();
  const navItems = role === 'admin' ? [
    { icon: <LayoutDashboard size={20} />, label: 'Dashboard', id: 'dashboard' },
    { icon: <Users size={20} />, label: 'Users', id: 'users' },
    { icon: <BookMarked size={20} />, label: 'Exam Setup', id: 'examsetup' },
    { icon: <FileBarChart size={20} />, label: 'Results', id: 'results' },
    { icon: <BarChart3 size={20} />, label: 'Reports', id: 'reports' },
    { icon: <Settings size={20} />, label: 'Settings', id: 'settings' },
  ] : [
    { icon: <LayoutDashboard size={20} />, label: 'Dashboard', id: 'dashboard' },
    { icon: <FileText size={20} />, label: role === 'student' ? 'My Results' : 'My Subjects', id: 'results' },
    { icon: <BookOpen size={20} />, label: 'Subjects', id: 'subjects' },
    { icon: <Download size={20} />, label: 'Transcripts', id: 'transcripts' },
    { icon: <Settings size={20} />, label: 'Settings', id: 'settings' },
  ];
  return (
    <div className="w-60 h-screen flex flex-col" style={{ background: '#0D1117', fontFamily: 'Inter, sans-serif' }}>
      <div className="p-8 flex items-center gap-3">
        <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
          <path d="M16 4L8 8V16L16 20L24 16V8L16 4Z" stroke="#6366F1" strokeWidth="2" fill="rgba(99,102,241,0.1)" />
          <path d="M16 12L12 14V18L16 20L20 18V14L16 12Z" stroke="#8B5CF6" strokeWidth="2" fill="rgba(139,92,246,0.1)" />
        </svg>
        <span className="text-white font-semibold">SRMS</span>
      </div>
      <nav className="flex-1 px-2">
        {navItems.map(item => (
          <button
            key={item.id}
            onClick={() => onNavChange(item.id)}
            className="w-full flex items-center gap-3 px-3 py-2 mb-1 rounded-lg transition-all"
            style={{
              background: activeSection === item.id ? `${accentColor}26` : 'transparent',
              color: activeSection === item.id ? '#F9FAFB' : '#9CA3AF',
              borderLeft: activeSection === item.id ? `3px solid ${accentColor}` : '3px solid transparent',
            }}
            onMouseEnter={(e) => { if (activeSection !== item.id) e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; }}
            onMouseLeave={(e) => { if (activeSection !== item.id) e.currentTarget.style.background = 'transparent'; }}>
            {item.icon}
            <span className="text-sm font-medium">{item.label}</span>
          </button>
        ))}
      </nav>
      <div className="p-4 border-t" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold"
               style={{ background: `${accentColor}26`, color: accentColor }}>
            {userName.split(' ').map((n: string) => n[0]).join('')}
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-medium truncate" style={{ color: '#F9FAFB' }}>{userName}</div>
            <div className="text-xs truncate" style={{ color: '#9CA3AF' }}>{userMeta}</div>
          </div>
        </div>
        <button onClick={() => navigate('/')} className="w-full flex items-center justify-center gap-2 py-2 rounded-lg text-sm hover:bg-white/5 transition-colors" style={{ color: '#9CA3AF' }}>
          <LogOut size={16} /><span>Logout</span>
        </button>
      </div>
    </div>
  );
}

function StudentDashboard() {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [showNotifications, setShowNotifications] = useState(false);

  const subjects = [
    { code: 'CS601', name: 'Data Structures', internal: 28, external: 65, max: 100, grade: 'A+', status: 'Pass', credits: 4, teacher: 'Rituparna Bhattacharya' },
    { code: 'CS602', name: 'Design & Analysis of Algorithms', internal: 26, external: 62, max: 100, grade: 'A', status: 'Pass', credits: 4, teacher: 'Rituparna Bhattacharya' },
    { code: 'CS603', name: 'Database Management Systems', internal: 25, external: 58, max: 100, grade: 'A', status: 'Pass', credits: 4, teacher: 'Dr. Priya Sharma' },
    { code: 'CS604', name: 'Operating Systems', internal: 27, external: 60, max: 100, grade: 'A', status: 'Pass', credits: 4, teacher: 'Dr. Rahul Singh' },
    { code: 'MA601', name: 'Engineering Mathematics VI', internal: 24, external: 55, max: 100, grade: 'B+', status: 'Pass', credits: 3, teacher: 'Dr. Anjali Verma' },
    { code: 'CS605', name: 'Software Engineering', internal: 29, external: 67, max: 100, grade: 'A+', status: 'Pass', credits: 4, teacher: 'Rituparna Bhattacharya' },
  ];

  return (
    <div className="flex h-screen" style={{ background: '#0A0F1E', fontFamily: 'Inter, sans-serif' }}>
      <Sidebar
        role="student"
        activeSection={activeSection}
        onNavChange={setActiveSection}
        accentColor="#6366F1"
        userName="Himanshu Shukla"
        userMeta="231001001350"
      />
      <div className="flex-1 overflow-auto">
        <div className="max-w-[1400px] mx-auto p-8">
          {activeSection === 'dashboard' && (
            <div>
              <div className="flex items-center justify-between mb-2">
                <h1 className="text-2xl font-semibold" style={{ color: '#F9FAFB' }}>Good morning, Himanshu 👋</h1>
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <button onClick={() => setShowNotifications(!showNotifications)}
                      className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-white/5 transition-colors relative"
                      style={{ color: '#9CA3AF' }}>
                      <Bell size={20} />
                      <div className="absolute top-2 right-2 w-2 h-2 rounded-full" style={{ background: '#EF4444' }} />
                    </button>
                    {showNotifications && (
                      <div className="absolute right-0 top-12 w-80 rounded-2xl p-4 z-50"
                           style={{ background: '#111827', border: '1px solid rgba(255,255,255,0.06)', boxShadow: '0 4px 24px rgba(0,0,0,0.4)' }}>
                        <div className="text-sm font-semibold mb-4" style={{ color: '#F9FAFB' }}>Notifications</div>
                        <div className="space-y-3">
                          <div className="flex gap-3">
                            <div className="w-2 h-2 rounded-full mt-1.5" style={{ background: '#10B981' }} />
                            <div className="flex-1">
                              <div className="text-sm" style={{ color: '#F9FAFB' }}>Semester VI results published</div>
                              <div className="text-xs" style={{ color: '#9CA3AF' }}>2 hours ago</div>
                            </div>
                          </div>
                          <div className="flex gap-3">
                            <div className="w-2 h-2 rounded-full mt-1.5" style={{ background: '#6366F1' }} />
                            <div className="flex-1">
                              <div className="text-sm" style={{ color: '#F9FAFB' }}>Transcript ready for download</div>
                              <div className="text-xs" style={{ color: '#9CA3AF' }}>1 day ago</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold"
                       style={{ background: 'rgba(99,102,241,0.15)', color: '#6366F1' }}>HS</div>
                </div>
              </div>
              <div className="text-sm mb-8" style={{ color: '#9CA3AF' }}>Semester VI  ·  B.Tech CSE  ·  Techno India University</div>

              <div className="grid grid-cols-4 gap-6 mb-8">
                {[
                  { value: '8.42', label: 'CURRENT CGPA', color: '#6366F1', trend: '+0.2 from last semester' },
                  { value: '8.15', label: 'SEMESTER GPA', color: '#8B5CF6', trend: '+0.1 from Sem V' },
                  { value: '6', label: 'SUBJECTS CLEARED', color: '#10B981', trend: 'All passed' },
                  { value: '0', label: 'ACTIVE BACKLOGS', color: '#4B5563', trend: 'Good standing' },
                ].map((stat, i) => (
                  <div key={i} className="rounded-2xl p-6 relative overflow-hidden"
                       style={{ background: '#111827', border: '1px solid rgba(255,255,255,0.06)', boxShadow: '0 0 0 1px rgba(255,255,255,0.05), 0 4px 24px rgba(0,0,0,0.4)' }}>
                    <div className="absolute top-0 left-0 right-0 h-px" style={{ background: `linear-gradient(90deg, ${stat.color}, transparent)` }} />
                    <div className="text-5xl font-bold mb-2" style={{ fontFamily: 'JetBrains Mono, monospace', color: stat.color }}>{stat.value}</div>
                    <div className="text-xs uppercase mb-3" style={{ color: '#9CA3AF', letterSpacing: '0.08em' }}>{stat.label}</div>
                    <div className="flex items-center gap-1 text-xs" style={{ color: i < 3 ? '#10B981' : '#9CA3AF' }}>
                      {i < 3 && <TrendingUp size={12} />}
                      <span>{stat.trend}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="rounded-2xl overflow-hidden" style={{ background: '#111827', border: '1px solid rgba(255,255,255,0.06)' }}>
                <div className="flex items-center justify-between p-6 border-b" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
                  <div className="text-xs uppercase font-medium" style={{ color: '#9CA3AF', letterSpacing: '0.08em' }}>SEMESTER VI — RESULTS</div>
                  <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm"
                          style={{ border: '1px solid rgba(255,255,255,0.1)', color: '#F9FAFB' }}>
                    Semester VI <ChevronDown size={16} />
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                        <th className="text-left px-6 py-4 text-xs uppercase font-medium" style={{ color: '#9CA3AF' }}>Subject Code</th>
                        <th className="text-left px-6 py-4 text-xs uppercase font-medium" style={{ color: '#9CA3AF' }}>Subject Name</th>
                        <th className="text-right px-6 py-4 text-xs uppercase font-medium" style={{ color: '#9CA3AF' }}>Internal</th>
                        <th className="text-right px-6 py-4 text-xs uppercase font-medium" style={{ color: '#9CA3AF' }}>External</th>
                        <th className="text-right px-6 py-4 text-xs uppercase font-medium" style={{ color: '#9CA3AF' }}>Total</th>
                        <th className="text-right px-6 py-4 text-xs uppercase font-medium" style={{ color: '#9CA3AF' }}>Max</th>
                        <th className="text-center px-6 py-4 text-xs uppercase font-medium" style={{ color: '#9CA3AF' }}>Grade</th>
                        <th className="text-center px-6 py-4 text-xs uppercase font-medium" style={{ color: '#9CA3AF' }}>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {subjects.map((subject, i) => (
                        <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                          <td className="px-6 py-4" style={{ fontFamily: 'JetBrains Mono, monospace', color: '#F9FAFB' }}>{subject.code}</td>
                          <td className="px-6 py-4" style={{ color: '#F9FAFB' }}>{subject.name}</td>
                          <td className="px-6 py-4 text-right" style={{ fontFamily: 'JetBrains Mono, monospace', color: '#F9FAFB' }}>{subject.internal}</td>
                          <td className="px-6 py-4 text-right" style={{ fontFamily: 'JetBrains Mono, monospace', color: '#F9FAFB' }}>{subject.external}</td>
                          <td className="px-6 py-4 text-right font-semibold" style={{ fontFamily: 'JetBrains Mono, monospace', color: '#F9FAFB' }}>{subject.internal + subject.external}</td>
                          <td className="px-6 py-4 text-right" style={{ fontFamily: 'JetBrains Mono, monospace', color: '#9CA3AF' }}>{subject.max}</td>
                          <td className="px-6 py-4 text-center">
                            <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold" style={getGradeStyle(subject.grade)}>{subject.grade}</span>
                          </td>
                          <td className="px-6 py-4 text-center">
                            <div className="flex items-center justify-center gap-2">
                              <div className="w-2 h-2 rounded-full" style={{ background: '#10B981' }} />
                              <span className="text-sm" style={{ color: '#10B981' }}>{subject.status}</span>
                            </div>
                          </td>
                        </tr>
                      ))}
                      <tr style={{ background: 'rgba(255,255,255,0.02)' }}>
                        <td colSpan={4} className="px-6 py-4 font-semibold" style={{ color: '#F9FAFB' }}>Semester Total</td>
                        <td className="px-6 py-4 text-right font-bold" style={{ fontFamily: 'JetBrains Mono, monospace', color: '#6366F1' }}>489</td>
                        <td className="px-6 py-4 text-right" style={{ fontFamily: 'JetBrains Mono, monospace', color: '#9CA3AF' }}>600</td>
                        <td className="px-6 py-4 text-center">
                          <div className="flex flex-col items-center gap-0.5">
                            <span className="text-xs uppercase" style={{ color: '#9CA3AF', letterSpacing: '0.06em' }}>GPA</span>
                            <span className="font-bold" style={{ fontFamily: 'JetBrains Mono, monospace', color: '#6366F1' }}>8.15</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <div className="flex flex-col items-center gap-0.5">
                            <span className="text-xs uppercase" style={{ color: '#9CA3AF', letterSpacing: '0.06em' }}>CGPA</span>
                            <span className="font-bold" style={{ fontFamily: 'JetBrains Mono, monospace', color: '#6366F1' }}>8.42</span>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeSection === 'results' && (
            <div>
              <h1 className="text-2xl font-semibold mb-2" style={{ color: '#F9FAFB' }}>My Results</h1>
              <div className="text-sm mb-8" style={{ color: '#9CA3AF' }}>View your semester-wise academic performance</div>

              <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="rounded-2xl p-8 relative" style={{ background: '#111827', border: '1px solid rgba(255,255,255,0.06)' }}>
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="text-xs uppercase mb-2" style={{ color: '#9CA3AF', letterSpacing: '0.08em' }}>Semester VI</div>
                      <div className="text-4xl font-bold mb-1" style={{ fontFamily: 'JetBrains Mono, monospace', color: '#6366F1' }}>8.15</div>
                      <div className="text-sm" style={{ color: '#9CA3AF' }}>GPA</div>
                    </div>
                    <div className="px-3 py-1 rounded-full text-xs font-semibold" style={{ background: 'rgba(99,102,241,0.15)', color: '#6366F1' }}>Current</div>
                  </div>
                  <div className="space-y-2 mt-6">
                    <div className="flex justify-between text-sm">
                      <span style={{ color: '#9CA3AF' }}>Subjects</span>
                      <span style={{ color: '#F9FAFB', fontFamily: 'JetBrains Mono, monospace' }}>6</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span style={{ color: '#9CA3AF' }}>Passed</span>
                      <span style={{ color: '#10B981', fontFamily: 'JetBrains Mono, monospace' }}>6</span>
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl p-8 relative" style={{ background: '#111827', border: '1px solid rgba(255,255,255,0.06)' }}>
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="text-xs uppercase mb-2" style={{ color: '#9CA3AF', letterSpacing: '0.08em' }}>Semester V</div>
                      <div className="text-4xl font-bold mb-1" style={{ fontFamily: 'JetBrains Mono, monospace', color: '#8B5CF6' }}>7.98</div>
                      <div className="text-sm" style={{ color: '#9CA3AF' }}>GPA</div>
                    </div>
                    <div className="px-3 py-1 rounded-full text-xs font-semibold" style={{ background: 'rgba(156,163,175,0.15)', color: '#9CA3AF' }}>Completed</div>
                  </div>
                  <div className="space-y-2 mt-6">
                    <div className="flex justify-between text-sm">
                      <span style={{ color: '#9CA3AF' }}>Subjects</span>
                      <span style={{ color: '#F9FAFB', fontFamily: 'JetBrains Mono, monospace' }}>6</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span style={{ color: '#9CA3AF' }}>Passed</span>
                      <span style={{ color: '#10B981', fontFamily: 'JetBrains Mono, monospace' }}>6</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl overflow-hidden" style={{ background: '#111827', border: '1px solid rgba(255,255,255,0.06)' }}>
                <div className="flex items-center justify-between p-6 border-b" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
                  <div className="text-xs uppercase font-medium" style={{ color: '#9CA3AF', letterSpacing: '0.08em' }}>SEMESTER VI — DETAILED RESULTS</div>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                        <th className="text-left px-6 py-4 text-xs uppercase font-medium" style={{ color: '#9CA3AF' }}>Subject Code</th>
                        <th className="text-left px-6 py-4 text-xs uppercase font-medium" style={{ color: '#9CA3AF' }}>Subject Name</th>
                        <th className="text-right px-6 py-4 text-xs uppercase font-medium" style={{ color: '#9CA3AF' }}>Internal</th>
                        <th className="text-right px-6 py-4 text-xs uppercase font-medium" style={{ color: '#9CA3AF' }}>External</th>
                        <th className="text-right px-6 py-4 text-xs uppercase font-medium" style={{ color: '#9CA3AF' }}>Total</th>
                        <th className="text-right px-6 py-4 text-xs uppercase font-medium" style={{ color: '#9CA3AF' }}>Max</th>
                        <th className="text-center px-6 py-4 text-xs uppercase font-medium" style={{ color: '#9CA3AF' }}>Grade</th>
                        <th className="text-center px-6 py-4 text-xs uppercase font-medium" style={{ color: '#9CA3AF' }}>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {subjects.map((subject, i) => (
                        <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                          <td className="px-6 py-4" style={{ fontFamily: 'JetBrains Mono, monospace', color: '#F9FAFB' }}>{subject.code}</td>
                          <td className="px-6 py-4" style={{ color: '#F9FAFB' }}>{subject.name}</td>
                          <td className="px-6 py-4 text-right" style={{ fontFamily: 'JetBrains Mono, monospace', color: '#F9FAFB' }}>{subject.internal}</td>
                          <td className="px-6 py-4 text-right" style={{ fontFamily: 'JetBrains Mono, monospace', color: '#F9FAFB' }}>{subject.external}</td>
                          <td className="px-6 py-4 text-right font-semibold" style={{ fontFamily: 'JetBrains Mono, monospace', color: '#F9FAFB' }}>{subject.internal + subject.external}</td>
                          <td className="px-6 py-4 text-right" style={{ fontFamily: 'JetBrains Mono, monospace', color: '#9CA3AF' }}>{subject.max}</td>
                          <td className="px-6 py-4 text-center">
                            <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold" style={getGradeStyle(subject.grade)}>{subject.grade}</span>
                          </td>
                          <td className="px-6 py-4 text-center">
                            <div className="flex items-center justify-center gap-2">
                              <div className="w-2 h-2 rounded-full" style={{ background: '#10B981' }} />
                              <span className="text-sm" style={{ color: '#10B981' }}>{subject.status}</span>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeSection === 'subjects' && (
            <div>
              <h1 className="text-2xl font-semibold mb-2" style={{ color: '#F9FAFB' }}>Subjects</h1>
              <div className="text-sm mb-8" style={{ color: '#9CA3AF' }}>Semester VI — Enrolled Courses</div>

              <div className="grid grid-cols-2 gap-6">
                {subjects.map((subject, i) => {
                  const gradeStyle = getGradeStyle(subject.grade);
                  return (
                    <div key={i} className="rounded-2xl p-6 relative overflow-hidden"
                         style={{ background: '#111827', border: '1px solid rgba(255,255,255,0.06)', borderTop: `3px solid ${gradeStyle.color}` }}>
                      <div className="flex items-start justify-between mb-4">
                        <div className="text-sm font-semibold" style={{ fontFamily: 'JetBrains Mono, monospace', color: '#6366F1' }}>{subject.code}</div>
                        <div className="px-2 py-1 rounded text-xs font-semibold" style={{ background: 'rgba(99,102,241,0.1)', color: '#6366F1' }}>
                          {subject.credits} Credits
                        </div>
                      </div>
                      <div className="font-semibold mb-3" style={{ color: '#F9FAFB' }}>{subject.name}</div>
                      <div className="text-sm" style={{ color: '#9CA3AF' }}>{subject.teacher}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {activeSection === 'transcripts' && (
            <div>
              <h1 className="text-2xl font-semibold mb-2" style={{ color: '#F9FAFB' }}>Transcripts</h1>
              <div className="text-sm mb-8" style={{ color: '#9CA3AF' }}>Download official academic transcripts</div>

              <div className="rounded-2xl p-8 mb-8" style={{ background: '#111827', border: '1px solid rgba(255,255,255,0.06)' }}>
                <div className="grid grid-cols-2 gap-8 mb-6">
                  <div>
                    <div className="text-xs uppercase mb-1" style={{ color: '#9CA3AF', letterSpacing: '0.06em' }}>Student Name</div>
                    <div className="font-semibold" style={{ color: '#F9FAFB' }}>Himanshu Shukla</div>
                  </div>
                  <div>
                    <div className="text-xs uppercase mb-1" style={{ color: '#9CA3AF', letterSpacing: '0.06em' }}>Enrollment Number</div>
                    <div className="font-semibold" style={{ fontFamily: 'JetBrains Mono, monospace', color: '#F9FAFB' }}>231001001350</div>
                  </div>
                  <div>
                    <div className="text-xs uppercase mb-1" style={{ color: '#9CA3AF', letterSpacing: '0.06em' }}>Department</div>
                    <div className="font-semibold" style={{ color: '#F9FAFB' }}>B.Tech Computer Science & Engineering</div>
                  </div>
                  <div>
                    <div className="text-xs uppercase mb-1" style={{ color: '#9CA3AF', letterSpacing: '0.06em' }}>University</div>
                    <div className="font-semibold" style={{ color: '#F9FAFB' }}>Techno India University</div>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl overflow-hidden mb-6" style={{ background: '#111827', border: '1px solid rgba(255,255,255,0.06)' }}>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                        <th className="text-left px-6 py-4 text-xs uppercase font-medium" style={{ color: '#9CA3AF' }}>Semester</th>
                        <th className="text-center px-6 py-4 text-xs uppercase font-medium" style={{ color: '#9CA3AF' }}>GPA</th>
                        <th className="text-right px-6 py-4 text-xs uppercase font-medium" style={{ color: '#9CA3AF' }}>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { sem: 'Semester VI', gpa: '8.15' },
                        { sem: 'Semester V', gpa: '7.98' },
                      ].map((item, i) => (
                        <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                          <td className="px-6 py-4" style={{ color: '#F9FAFB' }}>{item.sem}</td>
                          <td className="px-6 py-4 text-center" style={{ fontFamily: 'JetBrains Mono, monospace', color: '#6366F1', fontWeight: 600 }}>{item.gpa}</td>
                          <td className="px-6 py-4 text-right">
                            <button className="px-4 py-2 rounded-lg text-sm font-semibold hover:bg-indigo-600 transition-colors"
                                    style={{ border: '1px solid #6366F1', color: '#6366F1' }}>
                              Download PDF
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="flex justify-end">
                <button className="px-8 h-12 rounded-xl text-sm font-semibold"
                        style={{ background: 'linear-gradient(135deg, #6366F1, #8B5CF6)', color: 'white' }}>
                  Download Full Transcript
                </button>
              </div>
            </div>
          )}

          {activeSection === 'settings' && (
            <div>
              <h1 className="text-2xl font-semibold mb-2" style={{ color: '#F9FAFB' }}>Settings</h1>
              <div className="text-sm mb-8" style={{ color: '#9CA3AF' }}>Manage your profile and preferences</div>

              <div className="rounded-2xl p-8" style={{ background: '#111827', border: '1px solid rgba(255,255,255,0.06)' }}>
                <div className="space-y-6">
                  <div>
                    <label className="block text-xs uppercase mb-2" style={{ color: '#9CA3AF', letterSpacing: '0.05em' }}>Full Name</label>
                    <input type="text" defaultValue="Himanshu Shukla" className="w-full h-12 px-4 rounded-xl transition-all"
                      style={{ background: '#1F2937', border: '1px solid rgba(255,255,255,0.08)', color: '#F9FAFB', outline: 'none' }}
                      onFocus={(e) => e.target.style.border = '2px solid #6366F1'}
                      onBlur={(e) => e.target.style.border = '1px solid rgba(255,255,255,0.08)'} />
                  </div>
                  <div>
                    <label className="block text-xs uppercase mb-2" style={{ color: '#9CA3AF', letterSpacing: '0.05em' }}>Enrollment Number</label>
                    <input type="text" defaultValue="231001001350" disabled className="w-full h-12 px-4 rounded-xl"
                      style={{ background: '#1F2937', border: '1px solid rgba(255,255,255,0.08)', color: '#9CA3AF', outline: 'none', opacity: 0.6 }} />
                  </div>
                  <div>
                    <label className="block text-xs uppercase mb-2" style={{ color: '#9CA3AF', letterSpacing: '0.05em' }}>Email</label>
                    <input type="email" defaultValue="himanshu.shukla@student.tiu.edu.in" className="w-full h-12 px-4 rounded-xl transition-all"
                      style={{ background: '#1F2937', border: '1px solid rgba(255,255,255,0.08)', color: '#F9FAFB', outline: 'none' }}
                      onFocus={(e) => e.target.style.border = '2px solid #6366F1'}
                      onBlur={(e) => e.target.style.border = '1px solid rgba(255,255,255,0.08)'} />
                  </div>
                  <div>
                    <label className="block text-xs uppercase mb-2" style={{ color: '#9CA3AF', letterSpacing: '0.05em' }}>Department</label>
                    <input type="text" defaultValue="B.Tech CSE" disabled className="w-full h-12 px-4 rounded-xl"
                      style={{ background: '#1F2937', border: '1px solid rgba(255,255,255,0.08)', color: '#9CA3AF', outline: 'none', opacity: 0.6 }} />
                  </div>
                  <div>
                    <label className="block text-xs uppercase mb-2" style={{ color: '#9CA3AF', letterSpacing: '0.05em' }}>Semester</label>
                    <input type="text" defaultValue="VI" disabled className="w-full h-12 px-4 rounded-xl"
                      style={{ background: '#1F2937', border: '1px solid rgba(255,255,255,0.08)', color: '#9CA3AF', outline: 'none', opacity: 0.6 }} />
                  </div>
                </div>
                <div className="flex justify-end mt-8">
                  <button className="px-8 h-12 rounded-xl text-sm font-semibold"
                          style={{ background: 'linear-gradient(135deg, #6366F1, #8B5CF6)', color: 'white' }}>
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function TeacherDashboard() {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [activeTab, setActiveTab] = useState('Data Structures');
  const [searchQuery, setSearchQuery] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);

  const students = [
    { roll: '1350', name: 'Himanshu Shukla', internal: 28, external: 65, semester: 'VI', gpa: '8.15', status: 'Pass' },
    { roll: '1351', name: 'Md. Arieeb Ali', internal: 26, external: 62, semester: 'VI', gpa: '7.93', status: 'Pass' },
    { roll: '1352', name: 'Shagun Shaw', internal: 25, external: 58, semester: 'VI', gpa: '7.52', status: 'Pass' },
    { roll: '1353', name: 'Rishi Kedia', internal: 27, external: 60, semester: 'VI', gpa: '7.88', status: 'Pass' },
    { roll: '1354', name: 'Shubham Kumar', internal: 24, external: 55, semester: 'VI', gpa: '7.21', status: 'Pass' },
    { roll: '1355', name: 'Priya Verma', internal: 29, external: 67, semester: 'VI', gpa: '8.45', status: 'Pass' },
    { roll: '1356', name: 'Rahul Singh', internal: 23, external: 54, semester: 'VI', gpa: '7.08', status: 'Pass' },
    { roll: '1357', name: 'Sneha Patel', internal: 27, external: 63, semester: 'VI', gpa: '8.12', status: 'Pass' },
  ];

  const teacherSubjects = [
    { code: 'CS601', name: 'Data Structures', credits: 4, students: 48, status: 'Submitted', description: 'Advanced data structures and algorithms' },
    { code: 'CS602', name: 'Algorithms', credits: 4, students: 48, status: 'Pending', description: 'Design and analysis of algorithms' },
    { code: 'CS603', name: 'DBMS', credits: 4, students: 48, status: 'Submitted', description: 'Database management systems fundamentals' },
  ];

  const getGrade = (total: number) => {
    if (total >= 90) return 'A+';
    if (total >= 80) return 'A';
    if (total >= 70) return 'B+';
    if (total >= 60) return 'B';
    if (total >= 50) return 'C';
    return 'F';
  };

  const filteredStudents = students.filter(s =>
    s.name.toLowerCase().includes(searchQuery.toLowerCase()) || s.roll.includes(searchQuery)
  );

  return (
    <div className="flex h-screen" style={{ background: '#0A0F1E', fontFamily: 'Inter, sans-serif' }}>
      <Sidebar
        role="teacher"
        activeSection={activeSection}
        onNavChange={setActiveSection}
        accentColor="#8B5CF6"
        userName="Rituparna Bhattacharya"
        userMeta="Dept. of Computer Science"
      />
      <div className="flex-1 overflow-auto">
        <div className="max-w-[1400px] mx-auto p-8">
          {activeSection === 'dashboard' && (
            <div>
              <div className="flex items-center justify-between mb-2">
                <h1 className="text-2xl font-semibold" style={{ color: '#F9FAFB' }}>Faculty Dashboard</h1>
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <button onClick={() => setShowNotifications(!showNotifications)}
                      className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-white/5 transition-colors relative"
                      style={{ color: '#9CA3AF' }}>
                      <Bell size={20} />
                      <div className="absolute top-2 right-2 w-2 h-2 rounded-full" style={{ background: '#EF4444' }} />
                    </button>
                    {showNotifications && (
                      <div className="absolute right-0 top-12 w-80 rounded-2xl p-4 z-50"
                           style={{ background: '#111827', border: '1px solid rgba(255,255,255,0.06)', boxShadow: '0 4px 24px rgba(0,0,0,0.4)' }}>
                        <div className="text-sm font-semibold mb-4" style={{ color: '#F9FAFB' }}>Notifications</div>
                        <div className="space-y-3">
                          <div className="flex gap-3">
                            <div className="w-2 h-2 rounded-full mt-1.5" style={{ background: '#F59E0B' }} />
                            <div className="flex-1">
                              <div className="text-sm" style={{ color: '#F9FAFB' }}>12 results pending submission</div>
                              <div className="text-xs" style={{ color: '#9CA3AF' }}>Deadline: May 25, 2026</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold"
                       style={{ background: 'rgba(139,92,246,0.15)', color: '#8B5CF6' }}>RB</div>
                </div>
              </div>
              <div className="text-sm mb-8" style={{ color: '#9CA3AF' }}>Department of Computer Science</div>

              <div className="grid grid-cols-4 gap-6 mb-8">
                {[
                  { value: '48', label: 'TOTAL STUDENTS', color: '#8B5CF6' },
                  { value: '3', label: 'SUBJECTS ASSIGNED', color: '#6366F1' },
                  { value: '12', label: 'RESULTS PENDING', color: '#F59E0B' },
                  { value: '36', label: 'RESULTS SUBMITTED', color: '#10B981' },
                ].map((stat, i) => (
                  <div key={i} className="rounded-2xl p-6 relative overflow-hidden"
                       style={{ background: '#111827', border: '1px solid rgba(255,255,255,0.06)', boxShadow: '0 0 0 1px rgba(255,255,255,0.05), 0 4px 24px rgba(0,0,0,0.4)' }}>
                    <div className="absolute top-0 left-0 right-0 h-px" style={{ background: `linear-gradient(90deg, ${stat.color}, transparent)` }} />
                    <div className="text-5xl font-bold mb-2" style={{ fontFamily: 'JetBrains Mono, monospace', color: stat.color }}>{stat.value}</div>
                    <div className="text-xs uppercase" style={{ color: '#9CA3AF', letterSpacing: '0.08em' }}>{stat.label}</div>
                  </div>
                ))}
              </div>

              <div className="flex gap-8 mb-6 border-b" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
                {['Data Structures', 'Algorithms', 'DBMS'].map(tab => (
                  <button key={tab} onClick={() => setActiveTab(tab)}
                    className="pb-3 px-1 text-sm font-medium transition-colors relative"
                    style={{ color: activeTab === tab ? '#F9FAFB' : '#9CA3AF' }}>
                    {tab}
                    {activeTab === tab && <div className="absolute bottom-0 left-0 right-0 h-0.5" style={{ background: '#6366F1' }} />}
                  </button>
                ))}
              </div>

              <div className="flex gap-4 mb-6">
                <input type="text" placeholder="Search by name or roll number..." value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)} className="flex-1 h-10 px-4 rounded-xl transition-all"
                  style={{ background: '#1F2937', border: '1px solid rgba(255,255,255,0.08)', color: '#F9FAFB', outline: 'none' }}
                  onFocus={(e) => e.target.style.border = '2px solid #6366F1'}
                  onBlur={(e) => e.target.style.border = '1px solid rgba(255,255,255,0.08)'} />
                <button className="flex items-center gap-2 px-4 h-10 rounded-xl text-sm"
                        style={{ border: '1px solid rgba(255,255,255,0.1)', color: '#F9FAFB' }}>
                  All Sections <ChevronDown size={16} />
                </button>
              </div>

              <div className="rounded-2xl overflow-hidden mb-6" style={{ background: '#111827', border: '1px solid rgba(255,255,255,0.06)' }}>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                        <th className="text-left px-6 py-4 text-xs uppercase font-medium" style={{ color: '#9CA3AF' }}>Roll No</th>
                        <th className="text-left px-6 py-4 text-xs uppercase font-medium" style={{ color: '#9CA3AF' }}>Student Name</th>
                        <th className="text-right px-6 py-4 text-xs uppercase font-medium" style={{ color: '#9CA3AF' }}>Internal /30</th>
                        <th className="text-right px-6 py-4 text-xs uppercase font-medium" style={{ color: '#9CA3AF' }}>External /70</th>
                        <th className="text-right px-6 py-4 text-xs uppercase font-medium" style={{ color: '#9CA3AF' }}>Total /100</th>
                        <th className="text-center px-6 py-4 text-xs uppercase font-medium" style={{ color: '#9CA3AF' }}>Grade</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredStudents.map((student, i) => {
                        const total = student.internal + student.external;
                        const grade = getGrade(total);
                        return (
                          <tr key={i} className="hover:bg-white/[0.02] transition-colors" style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                            <td className="px-6 py-4" style={{ fontFamily: 'JetBrains Mono, monospace', color: '#F9FAFB' }}>{student.roll}</td>
                            <td className="px-6 py-4" style={{ color: '#F9FAFB' }}>{student.name}</td>
                            <td className="px-6 py-4 text-right">
                              <input type="number" defaultValue={student.internal} className="w-20 text-right bg-transparent outline-none transition-all"
                                style={{ fontFamily: 'JetBrains Mono, monospace', color: '#F9FAFB', borderBottom: '2px solid transparent' }}
                                onFocus={(e) => e.target.style.borderBottom = '2px solid #6366F1'}
                                onBlur={(e) => e.target.style.borderBottom = '2px solid transparent'} />
                            </td>
                            <td className="px-6 py-4 text-right">
                              <input type="number" defaultValue={student.external} className="w-20 text-right bg-transparent outline-none transition-all"
                                style={{ fontFamily: 'JetBrains Mono, monospace', color: '#F9FAFB', borderBottom: '2px solid transparent' }}
                                onFocus={(e) => e.target.style.borderBottom = '2px solid #6366F1'}
                                onBlur={(e) => e.target.style.borderBottom = '2px solid transparent'} />
                            </td>
                            <td className="px-6 py-4 text-right" style={{ fontFamily: 'JetBrains Mono, monospace', color: '#9CA3AF', background: 'rgba(255,255,255,0.02)' }}>{total}</td>
                            <td className="px-6 py-4 text-center">
                              <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold" style={getGradeStyle(grade)}>{grade}</span>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm" style={{ color: '#9CA3AF' }}>
                  <CheckCircle size={16} style={{ color: '#10B981' }} />
                  <span>Last saved: 2 minutes ago</span>
                </div>
                <div className="flex items-center gap-3">
                  <button className="px-6 h-10 rounded-xl text-sm font-semibold hover:bg-white/5 transition-colors"
                          style={{ border: '1px solid rgba(255,255,255,0.1)', color: '#F9FAFB' }}>Save Draft</button>
                  <button className="px-6 h-10 rounded-xl text-sm font-semibold"
                          style={{ background: 'linear-gradient(135deg, #6366F1, #8B5CF6)', color: 'white' }}>Submit for Review</button>
                </div>
              </div>
              <div className="flex items-center gap-2 mt-4 text-xs justify-end" style={{ color: '#F59E0B' }}>
                <AlertTriangle size={14} />
                <span>Marks cannot be edited after submission to admin.</span>
              </div>
            </div>
          )}

          {activeSection === 'results' && (
            <div>
              <h1 className="text-2xl font-semibold mb-2" style={{ color: '#F9FAFB' }}>My Subjects</h1>
              <div className="text-sm mb-8" style={{ color: '#9CA3AF' }}>Semester VI — Assigned Courses</div>

              <div className="grid grid-cols-3 gap-6">
                {teacherSubjects.map((subject, i) => (
                  <div key={i} className="rounded-2xl p-6"
                       style={{ background: '#111827', border: '1px solid rgba(255,255,255,0.06)' }}>
                    <div className="text-sm font-semibold mb-1" style={{ fontFamily: 'JetBrains Mono, monospace', color: '#8B5CF6' }}>{subject.code}</div>
                    <div className="font-semibold mb-3" style={{ color: '#F9FAFB' }}>{subject.name}</div>
                    <div className="flex items-center gap-4 mb-4 text-sm" style={{ color: '#9CA3AF' }}>
                      <div>{subject.credits} Credits</div>
                      <div>·</div>
                      <div>{subject.students} Students</div>
                    </div>
                    <div className="mb-4">
                      <div className="px-3 py-1 rounded-full text-xs font-semibold inline-block"
                           style={{
                             background: subject.status === 'Submitted' ? 'rgba(16,185,129,0.15)' : 'rgba(245,158,11,0.15)',
                             color: subject.status === 'Submitted' ? '#10B981' : '#F59E0B'
                           }}>
                        {subject.status}
                      </div>
                    </div>
                    <button onClick={() => setActiveSection('dashboard')}
                            className="w-full px-4 py-2 rounded-lg text-sm font-semibold hover:bg-violet-600 transition-colors"
                            style={{ border: '1px solid #8B5CF6', color: '#8B5CF6' }}>
                      Enter Marks →
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeSection === 'subjects' && (
            <div>
              <h1 className="text-2xl font-semibold mb-2" style={{ color: '#F9FAFB' }}>Subjects</h1>
              <div className="text-sm mb-8" style={{ color: '#9CA3AF' }}>Detailed subject information</div>

              <div className="grid grid-cols-3 gap-6">
                {teacherSubjects.map((subject, i) => {
                  const gradeData = [
                    { grade: 'A+', count: 12 },
                    { grade: 'A', count: 15 },
                    { grade: 'B+', count: 8 },
                    { grade: 'B', count: 6 },
                    { grade: 'C', count: 4 },
                    { grade: 'F', count: 3 },
                  ];
                  const maxCount = Math.max(...gradeData.map(g => g.count));
                  return (
                    <div key={i} className="rounded-2xl p-6"
                         style={{ background: '#111827', border: '1px solid rgba(255,255,255,0.06)' }}>
                      <div className="text-sm font-semibold mb-1" style={{ fontFamily: 'JetBrains Mono, monospace', color: '#8B5CF6' }}>{subject.code}</div>
                      <div className="font-semibold mb-2" style={{ color: '#F9FAFB' }}>{subject.name}</div>
                      <div className="text-sm mb-4" style={{ color: '#9CA3AF' }}>{subject.description}</div>
                      <div className="flex items-center gap-4 mb-4 text-sm" style={{ color: '#9CA3AF' }}>
                        <div>{subject.credits} Credits</div>
                        <div>·</div>
                        <div>{subject.students} Students</div>
                      </div>
                      <div className="text-xs mb-2" style={{ color: '#9CA3AF' }}>Exam Date: June 15, 2026</div>
                      <div className="pt-4 border-t" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
                        <div className="text-xs uppercase mb-2" style={{ color: '#9CA3AF', letterSpacing: '0.06em' }}>Grade Distribution</div>
                        <div className="flex items-end gap-1 h-12">
                          {gradeData.map((item, idx) => {
                            const style = getGradeStyle(item.grade);
                            return (
                              <div key={idx} className="flex-1 flex flex-col items-center gap-1">
                                <div className="w-full rounded-t" style={{ height: `${(item.count / maxCount) * 100}%`, background: style.color, minHeight: '4px' }} />
                                <div className="text-xs" style={{ color: '#9CA3AF', fontFamily: 'JetBrains Mono, monospace' }}>{item.grade}</div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {activeSection === 'transcripts' && (
            <div>
              <h1 className="text-2xl font-semibold mb-2" style={{ color: '#F9FAFB' }}>Transcripts</h1>
              <div className="text-sm mb-8" style={{ color: '#9CA3AF' }}>View student transcripts and performance</div>

              <div className="flex gap-4 mb-6">
                <input type="text" placeholder="Search by name or roll number..." value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)} className="flex-1 h-10 px-4 rounded-xl transition-all"
                  style={{ background: '#1F2937', border: '1px solid rgba(255,255,255,0.08)', color: '#F9FAFB', outline: 'none' }}
                  onFocus={(e) => e.target.style.border = '2px solid #6366F1'}
                  onBlur={(e) => e.target.style.border = '1px solid rgba(255,255,255,0.08)'} />
              </div>

              <div className="rounded-2xl overflow-hidden" style={{ background: '#111827', border: '1px solid rgba(255,255,255,0.06)' }}>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                        <th className="text-left px-6 py-4 text-xs uppercase font-medium" style={{ color: '#9CA3AF' }}>Roll No</th>
                        <th className="text-left px-6 py-4 text-xs uppercase font-medium" style={{ color: '#9CA3AF' }}>Name</th>
                        <th className="text-center px-6 py-4 text-xs uppercase font-medium" style={{ color: '#9CA3AF' }}>Semester</th>
                        <th className="text-center px-6 py-4 text-xs uppercase font-medium" style={{ color: '#9CA3AF' }}>GPA</th>
                        <th className="text-center px-6 py-4 text-xs uppercase font-medium" style={{ color: '#9CA3AF' }}>Status</th>
                        <th className="text-right px-6 py-4 text-xs uppercase font-medium" style={{ color: '#9CA3AF' }}>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredStudents.map((student, i) => (
                        <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                          <td className="px-6 py-4" style={{ fontFamily: 'JetBrains Mono, monospace', color: '#F9FAFB' }}>{student.roll}</td>
                          <td className="px-6 py-4" style={{ color: '#F9FAFB' }}>{student.name}</td>
                          <td className="px-6 py-4 text-center" style={{ color: '#9CA3AF' }}>{student.semester}</td>
                          <td className="px-6 py-4 text-center" style={{ fontFamily: 'JetBrains Mono, monospace', color: '#8B5CF6', fontWeight: 600 }}>{student.gpa}</td>
                          <td className="px-6 py-4 text-center">
                            <div className="inline-block px-3 py-1 rounded-full text-xs font-semibold" style={{ background: 'rgba(16,185,129,0.15)', color: '#10B981' }}>
                              {student.status}
                            </div>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <button className="text-sm" style={{ color: '#8B5CF6' }}>View</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeSection === 'settings' && (
            <div>
              <h1 className="text-2xl font-semibold mb-2" style={{ color: '#F9FAFB' }}>Settings</h1>
              <div className="text-sm mb-8" style={{ color: '#9CA3AF' }}>Manage your profile and preferences</div>

              <div className="rounded-2xl p-8" style={{ background: '#111827', border: '1px solid rgba(255,255,255,0.06)' }}>
                <div className="space-y-6">
                  <div>
                    <label className="block text-xs uppercase mb-2" style={{ color: '#9CA3AF', letterSpacing: '0.05em' }}>Full Name</label>
                    <input type="text" defaultValue="Rituparna Bhattacharya" className="w-full h-12 px-4 rounded-xl transition-all"
                      style={{ background: '#1F2937', border: '1px solid rgba(255,255,255,0.08)', color: '#F9FAFB', outline: 'none' }}
                      onFocus={(e) => e.target.style.border = '2px solid #8B5CF6'}
                      onBlur={(e) => e.target.style.border = '1px solid rgba(255,255,255,0.08)'} />
                  </div>
                  <div>
                    <label className="block text-xs uppercase mb-2" style={{ color: '#9CA3AF', letterSpacing: '0.05em' }}>Department</label>
                    <input type="text" defaultValue="Computer Science" className="w-full h-12 px-4 rounded-xl transition-all"
                      style={{ background: '#1F2937', border: '1px solid rgba(255,255,255,0.08)', color: '#F9FAFB', outline: 'none' }}
                      onFocus={(e) => e.target.style.border = '2px solid #8B5CF6'}
                      onBlur={(e) => e.target.style.border = '1px solid rgba(255,255,255,0.08)'} />
                  </div>
                  <div>
                    <label className="block text-xs uppercase mb-2" style={{ color: '#9CA3AF', letterSpacing: '0.05em' }}>Email</label>
                    <input type="email" defaultValue="rituparna.bhattacharya@tiu.edu.in" className="w-full h-12 px-4 rounded-xl transition-all"
                      style={{ background: '#1F2937', border: '1px solid rgba(255,255,255,0.08)', color: '#F9FAFB', outline: 'none' }}
                      onFocus={(e) => e.target.style.border = '2px solid #8B5CF6'}
                      onBlur={(e) => e.target.style.border = '1px solid rgba(255,255,255,0.08)'} />
                  </div>
                  <div>
                    <label className="block text-xs uppercase mb-2" style={{ color: '#9CA3AF', letterSpacing: '0.05em' }}>Designation</label>
                    <input type="text" defaultValue="Assistant Professor" className="w-full h-12 px-4 rounded-xl transition-all"
                      style={{ background: '#1F2937', border: '1px solid rgba(255,255,255,0.08)', color: '#F9FAFB', outline: 'none' }}
                      onFocus={(e) => e.target.style.border = '2px solid #8B5CF6'}
                      onBlur={(e) => e.target.style.border = '1px solid rgba(255,255,255,0.08)'} />
                  </div>
                </div>
                <div className="flex justify-end mt-8">
                  <button className="px-8 h-12 rounded-xl text-sm font-semibold"
                          style={{ background: 'linear-gradient(135deg, #8B5CF6, #A78BFA)', color: 'white' }}>
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const gradeChartData = [
  { grade: 'A+', count: 12, percent: 25 },
  { grade: 'A',  count: 15, percent: 31 },
  { grade: 'B+', count: 8,  percent: 17 },
  { grade: 'B',  count: 6,  percent: 13 },
  { grade: 'C',  count: 4,  percent: 8  },
  { grade: 'F',  count: 3,  percent: 6  },
];

function ResultWizard({ wizardStep, setWizardStep, publishConfirmed, setPublishConfirmed, onBackFromStep2 }: {
  wizardStep: number;
  setWizardStep: (s: number) => void;
  publishConfirmed: boolean;
  setPublishConfirmed: (v: boolean) => void;
  onBackFromStep2: () => void;
}) {
  return (
    <div>
      <div className="flex items-center justify-center mb-12">
        <div className="flex items-center gap-4">
          <div className="flex flex-col items-center">
            <div className="w-10 h-10 rounded-full flex items-center justify-center mb-2" style={{ background: '#10B981' }}>
              <Check size={20} style={{ color: 'white' }} />
            </div>
            <span className="text-xs" style={{ color: '#10B981' }}>Select Exam</span>
          </div>
          <div className="w-16 h-px" style={{ background: '#10B981' }} />
          <div className="flex flex-col items-center">
            {wizardStep === 3 ? (
              <div className="w-10 h-10 rounded-full flex items-center justify-center mb-2" style={{ background: '#10B981' }}>
                <Check size={20} style={{ color: 'white' }} />
              </div>
            ) : (
              <div className="w-10 h-10 rounded-full flex items-center justify-center mb-2"
                   style={{ background: '#6366F1', boxShadow: '0 0 0 4px rgba(99,102,241,0.3)' }}>
                <span className="text-sm font-semibold" style={{ color: 'white' }}>2</span>
              </div>
            )}
            <span className="text-xs" style={{ color: wizardStep === 3 ? '#10B981' : '#6366F1' }}>Review Summary</span>
          </div>
          <div className="w-16 h-px" style={{ background: wizardStep === 3 ? '#6366F1' : '#4B5563' }} />
          <div className="flex flex-col items-center">
            {wizardStep === 3 ? (
              <div className="w-10 h-10 rounded-full flex items-center justify-center mb-2"
                   style={{ background: '#6366F1', boxShadow: '0 0 0 4px rgba(99,102,241,0.3)' }}>
                <span className="text-sm font-semibold" style={{ color: 'white' }}>3</span>
              </div>
            ) : (
              <div className="w-10 h-10 rounded-full flex items-center justify-center mb-2" style={{ background: '#1F2937' }}>
                <span className="text-sm font-semibold" style={{ color: '#9CA3AF' }}>3</span>
              </div>
            )}
            <span className="text-xs" style={{ color: wizardStep === 3 ? '#6366F1' : '#9CA3AF' }}>Confirm &amp; Publish</span>
          </div>
        </div>
      </div>

      {wizardStep === 2 && (
        <div>
          <div className="flex gap-8 mb-8">
            <div className="flex-[3]">
              <div className="text-xs uppercase font-medium mb-6" style={{ color: '#9CA3AF', letterSpacing: '0.08em' }}>GRADE DISTRIBUTION</div>
              <div className="space-y-3">
                {gradeChartData.map((item) => {
                  const style = getGradeStyle(item.grade);
                  return (
                    <div key={item.grade} className="flex items-center gap-4">
                      <span className="w-8 text-sm font-semibold" style={{ fontFamily: 'JetBrains Mono, monospace', color: '#F9FAFB' }}>{item.grade}</span>
                      <div className="flex-1 h-8 rounded-lg overflow-hidden" style={{ background: 'rgba(255,255,255,0.05)' }}>
                        <div className="h-full flex items-center px-3 transition-all" style={{ width: `${item.percent}%`, background: style.color }}>
                          <span className="text-xs font-semibold" style={{ color: 'white' }}>{item.percent}%</span>
                        </div>
                      </div>
                      <span className="w-12 text-right text-sm" style={{ fontFamily: 'JetBrains Mono, monospace', color: '#9CA3AF' }}>{item.count}</span>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="flex-[2] space-y-6">
              <div className="rounded-2xl p-6 text-center" style={{ background: '#111827', border: '1px solid rgba(255,255,255,0.06)' }}>
                <div className="text-xs uppercase mb-4" style={{ color: '#9CA3AF', letterSpacing: '0.08em' }}>PASS RATE</div>
                <div className="relative inline-flex items-center justify-center mb-2">
                  <svg className="w-32 h-32 transform -rotate-90">
                    <circle cx="64" cy="64" r="56" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="8" />
                    <circle cx="64" cy="64" r="56" fill="none" stroke="#10B981" strokeWidth="8"
                            strokeDasharray={`${2 * Math.PI * 56 * 0.78} ${2 * Math.PI * 56}`} strokeLinecap="round" />
                  </svg>
                  <div className="absolute text-4xl font-bold" style={{ fontFamily: 'JetBrains Mono, monospace', color: '#10B981' }}>78%</div>
                </div>
              </div>
              <div className="rounded-2xl p-6 text-center" style={{ background: '#111827', border: '1px solid rgba(255,255,255,0.06)' }}>
                <div className="text-xs uppercase mb-4" style={{ color: '#9CA3AF', letterSpacing: '0.08em' }}>COMPLETION RATE</div>
                <div className="relative inline-flex items-center justify-center mb-2">
                  <svg className="w-32 h-32 transform -rotate-90">
                    <circle cx="64" cy="64" r="56" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="8" />
                    <circle cx="64" cy="64" r="56" fill="none" stroke="#6366F1" strokeWidth="8"
                            strokeDasharray={`${2 * Math.PI * 56 * 0.96} ${2 * Math.PI * 56}`} strokeLinecap="round" />
                  </svg>
                  <div className="absolute text-4xl font-bold" style={{ fontFamily: 'JetBrains Mono, monospace', color: '#6366F1' }}>96%</div>
                </div>
              </div>
              <div className="text-center text-sm" style={{ color: '#9CA3AF' }}>48 students  ·  6 subjects  ·  Semester VI</div>
            </div>
          </div>
          <div className="flex items-center justify-between pt-6 border-t" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
            <button onClick={onBackFromStep2}
                    className="flex items-center gap-2 px-6 h-10 rounded-xl text-sm font-semibold hover:bg-white/5 transition-colors"
                    style={{ border: '1px solid rgba(255,255,255,0.1)', color: '#F9FAFB' }}>
              <ArrowLeft size={16} /> Back
            </button>
            <button onClick={() => setWizardStep(3)} className="px-6 h-10 rounded-xl text-sm font-semibold"
                    style={{ background: 'linear-gradient(135deg, #6366F1, #8B5CF6)', color: 'white' }}>
              Proceed to Confirm →
            </button>
          </div>
        </div>
      )}

      {wizardStep === 3 && (
        <div className="flex flex-col items-center">
          <div className="w-[72px] h-[72px] rounded-full flex items-center justify-center mb-6"
               style={{ background: 'rgba(99,102,241,0.15)', boxShadow: '0 0 0 8px rgba(99,102,241,0.15)' }}>
            <Lock size={28} style={{ color: '#6366F1' }} />
          </div>
          <h2 className="font-bold text-center mb-3" style={{ fontSize: '28px', color: 'white' }}>Ready to Publish?</h2>
          <p className="text-sm text-center mb-8" style={{ color: '#9CA3AF' }}>48 students  ·  6 subjects  ·  Semester VI — 2025-26</p>
          <div className="w-full flex items-start gap-3 rounded-xl p-4 mb-8"
               style={{ background: 'rgba(245,158,11,0.05)', border: '1px solid rgba(245,158,11,0.2)' }}>
            <AlertTriangle size={18} style={{ color: '#F59E0B', flexShrink: 0, marginTop: '1px' }} />
            <p className="text-sm" style={{ color: '#F59E0B' }}>This action is permanent. Results will be immediately visible to all students.</p>
          </div>
          <label className="flex items-center gap-3 w-full mb-8 cursor-pointer">
            <input type="checkbox" checked={publishConfirmed} onChange={(e) => setPublishConfirmed(e.target.checked)}
              className="w-4 h-4 rounded" style={{ accentColor: '#6366F1' }} />
            <span className="text-sm" style={{ color: '#F9FAFB' }}>I confirm that all marks are verified and correct</span>
          </label>
          <div className="w-full flex flex-col" style={{ gap: '12px' }}>
            <button onClick={() => setWizardStep(2)}
                    className="w-full h-12 rounded-xl text-sm font-semibold hover:bg-white/5 transition-colors"
                    style={{ border: '1px solid rgba(255,255,255,0.1)', color: 'white' }}>← Back</button>
            <button disabled={!publishConfirmed} className="w-full h-12 rounded-xl text-sm font-semibold transition-all"
                    style={{
                      background: publishConfirmed ? 'linear-gradient(135deg, #6366F1, #8B5CF6)' : 'rgba(99,102,241,0.3)',
                      color: publishConfirmed ? 'white' : 'rgba(255,255,255,0.4)',
                      cursor: publishConfirmed ? 'pointer' : 'not-allowed',
                    }}>Confirm &amp; Publish</button>
          </div>
        </div>
      )}
    </div>
  );
}

function AdminDashboard() {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [showModal, setShowModal] = useState(false);
  const [wizardStep, setWizardStep] = useState(2);
  const [publishConfirmed, setPublishConfirmed] = useState(false);

  const resetWizard = () => { setWizardStep(2); setPublishConfirmed(false); };
  const handleCloseModal = () => { setShowModal(false); resetWizard(); };
  const handleNavChange = (id: string) => { setActiveSection(id); resetWizard(); };

  const activities = [
    { type: 'success', text: 'Semester VI results published', time: '2 hours ago' },
    { type: 'info', text: 'Marks submitted by Rituparna Bhattacharya', time: '5 hours ago' },
    { type: 'warning', text: 'New faculty account created: Dr. Priya Sharma', time: '1 day ago' },
    { type: 'info', text: 'Student enrollment updated: 48 students', time: '2 days ago' },
  ];

  const users = [
    { name: 'Himanshu Shukla', role: 'Student', department: 'CSE', email: 'himanshu@student.tiu.edu.in', status: 'Active' },
    { name: 'Rituparna Bhattacharya', role: 'Faculty', department: 'CSE', email: 'rituparna@tiu.edu.in', status: 'Active' },
    { name: 'Md. Arieeb Ali', role: 'Student', department: 'CSE', email: 'arieeb@student.tiu.edu.in', status: 'Active' },
    { name: 'Dr. Priya Sharma', role: 'Faculty', department: 'CSE', email: 'priya.sharma@tiu.edu.in', status: 'Active' },
    { name: 'Shagun Shaw', role: 'Student', department: 'CSE', email: 'shagun@student.tiu.edu.in', status: 'Active' },
    { name: 'Dr. Rahul Singh', role: 'Faculty', department: 'CSE', email: 'rahul.singh@tiu.edu.in', status: 'Inactive' },
  ];

  const exams = [
    { name: 'Mid Semester Exam — Sem VI', date: 'April 15, 2026', subjects: 6, status: 'Completed' },
    { name: 'End Semester Exam — Sem VI', date: 'June 15, 2026', subjects: 6, status: 'Scheduled' },
    { name: 'Practical Exam — Sem VI', date: 'June 25, 2026', subjects: 3, status: 'Scheduled' },
  ];

  return (
    <div className="flex h-screen" style={{ background: '#0A0F1E', fontFamily: 'Inter, sans-serif' }}>
      <Sidebar
        role="admin"
        activeSection={activeSection}
        onNavChange={handleNavChange}
        accentColor="#F59E0B"
        userName="Admin User"
        userMeta="System Administrator"
      />

      <div className="flex-1 overflow-auto">
        <div className="max-w-[1400px] mx-auto p-8">

          {activeSection === 'results' && (
            <div className="rounded-2xl p-8" style={{ background: '#111827', border: '1px solid rgba(255,255,255,0.06)' }}>
              <ResultWizard
                wizardStep={wizardStep}
                setWizardStep={setWizardStep}
                publishConfirmed={publishConfirmed}
                setPublishConfirmed={setPublishConfirmed}
                onBackFromStep2={() => { setActiveSection('dashboard'); resetWizard(); }}
              />
            </div>
          )}

          {activeSection === 'dashboard' && (
            <div>
              <div className="mb-2">
                <h1 className="text-2xl font-semibold" style={{ color: '#F9FAFB' }}>Administrator Dashboard</h1>
              </div>
              <div className="text-sm mb-8" style={{ color: '#9CA3AF' }}>System Management &amp; Oversight</div>

              <div className="grid grid-cols-4 gap-6 mb-8">
                {[
                  { value: '248', label: 'TOTAL STUDENTS', color: '#6366F1' },
                  { value: '24', label: 'TOTAL FACULTY', color: '#8B5CF6' },
                  { value: '3', label: 'ACTIVE EXAMS', color: '#F59E0B' },
                  { value: '12', label: 'PUBLISHED RESULTS', color: '#10B981' },
                ].map((stat, i) => (
                  <div key={i} className="rounded-2xl p-6 relative overflow-hidden"
                       style={{ background: '#111827', border: '1px solid rgba(255,255,255,0.06)', boxShadow: '0 0 0 1px rgba(255,255,255,0.05), 0 4px 24px rgba(0,0,0,0.4)' }}>
                    <div className="absolute top-0 left-0 right-0 h-px" style={{ background: `linear-gradient(90deg, ${stat.color}, transparent)` }} />
                    <div className="text-5xl font-bold mb-2" style={{ fontFamily: 'JetBrains Mono, monospace', color: stat.color }}>{stat.value}</div>
                    <div className="text-xs uppercase" style={{ color: '#9CA3AF', letterSpacing: '0.08em' }}>{stat.label}</div>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-6 mb-8">
                {[
                  { icon: <Users size={32} />, title: 'User Management', desc: 'Manage student and faculty accounts, bulk CSV import', color: '#6366F1' },
                  { icon: <BookMarked size={32} />, title: 'Exam Setup', desc: 'Create and configure exams per semester', color: '#8B5CF6' },
                  { icon: <FileBarChart size={32} />, title: 'Result Management', desc: 'Review submitted marks, trigger publication', color: '#F59E0B', action: () => setShowModal(true) },
                  { icon: <BarChart3 size={32} />, title: 'Reports', desc: 'Generate and download institution-wide result reports', color: '#10B981' },
                ].map((service, i) => (
                  <div key={i} className="rounded-2xl p-8 group cursor-pointer transition-all hover:-translate-y-1"
                       style={{ background: '#111827', border: '1px solid rgba(255,255,255,0.06)' }}
                       onClick={service.action}>
                    <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4" style={{ background: `${service.color}26`, color: service.color }}>
                      {service.icon}
                    </div>
                    <h3 className="text-xl font-semibold mb-2" style={{ color: '#F9FAFB' }}>{service.title}</h3>
                    <p className="text-sm mb-4" style={{ color: '#9CA3AF' }}>{service.desc}</p>
                    <button className="text-sm font-medium hover:underline" style={{ color: service.color }}>Open →</button>
                  </div>
                ))}
              </div>

              <div className="rounded-2xl p-6" style={{ background: '#111827', border: '1px solid rgba(255,255,255,0.06)' }}>
                <div className="text-xs uppercase font-medium mb-6" style={{ color: '#9CA3AF', letterSpacing: '0.08em' }}>RECENT ACTIVITY</div>
                <div className="space-y-4">
                  {activities.map((activity, i) => (
                    <div key={i} className="flex items-start gap-4 pb-4 border-b last:border-0" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
                      <div className="w-2 h-2 rounded-full mt-2"
                           style={{ background: activity.type === 'success' ? '#10B981' : activity.type === 'warning' ? '#F59E0B' : '#6366F1' }} />
                      <div className="flex-1">
                        <div className="text-sm" style={{ color: '#F9FAFB' }}>{activity.text}</div>
                        <div className="text-xs mt-1" style={{ color: '#9CA3AF' }}>{activity.time}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeSection === 'users' && (
            <div>
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h1 className="text-2xl font-semibold mb-2" style={{ color: '#F9FAFB' }}>Users</h1>
                  <div className="text-sm" style={{ color: '#9CA3AF' }}>Manage student and faculty accounts</div>
                </div>
                <button className="px-6 h-10 rounded-xl text-sm font-semibold"
                        style={{ background: '#6366F1', color: 'white' }}>
                  + Add User
                </button>
              </div>

              <div className="rounded-2xl overflow-hidden" style={{ background: '#111827', border: '1px solid rgba(255,255,255,0.06)' }}>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                        <th className="text-left px-6 py-4 text-xs uppercase font-medium" style={{ color: '#9CA3AF' }}>Name</th>
                        <th className="text-left px-6 py-4 text-xs uppercase font-medium" style={{ color: '#9CA3AF' }}>Role</th>
                        <th className="text-left px-6 py-4 text-xs uppercase font-medium" style={{ color: '#9CA3AF' }}>Department</th>
                        <th className="text-left px-6 py-4 text-xs uppercase font-medium" style={{ color: '#9CA3AF' }}>Email</th>
                        <th className="text-center px-6 py-4 text-xs uppercase font-medium" style={{ color: '#9CA3AF' }}>Status</th>
                        <th className="text-right px-6 py-4 text-xs uppercase font-medium" style={{ color: '#9CA3AF' }}>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map((user, i) => (
                        <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                          <td className="px-6 py-4" style={{ color: '#F9FAFB' }}>{user.name}</td>
                          <td className="px-6 py-4">
                            <div className="inline-block px-3 py-1 rounded-full text-xs font-semibold"
                                 style={{
                                   background: user.role === 'Student' ? 'rgba(99,102,241,0.15)' : 'rgba(139,92,246,0.15)',
                                   color: user.role === 'Student' ? '#6366F1' : '#8B5CF6'
                                 }}>
                              {user.role}
                            </div>
                          </td>
                          <td className="px-6 py-4" style={{ color: '#F9FAFB' }}>{user.department}</td>
                          <td className="px-6 py-4" style={{ color: '#9CA3AF' }}>{user.email}</td>
                          <td className="px-6 py-4 text-center">
                            <div className="inline-block px-3 py-1 rounded-full text-xs font-semibold"
                                 style={{
                                   background: user.status === 'Active' ? 'rgba(16,185,129,0.15)' : 'rgba(156,163,175,0.15)',
                                   color: user.status === 'Active' ? '#10B981' : '#9CA3AF'
                                 }}>
                              {user.status}
                            </div>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <button className="text-sm" style={{ color: '#F59E0B' }}><Edit2 size={16} /></button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeSection === 'examsetup' && (
            <div>
              <h1 className="text-2xl font-semibold mb-2" style={{ color: '#F9FAFB' }}>Exam Setup</h1>
              <div className="text-sm mb-8" style={{ color: '#9CA3AF' }}>Create and manage examinations</div>

              <div className="grid grid-cols-3 gap-6">
                {exams.map((exam, i) => (
                  <div key={i} className="rounded-2xl p-6"
                       style={{ background: '#111827', border: '1px solid rgba(255,255,255,0.06)' }}>
                    <div className="font-semibold mb-3" style={{ color: '#F9FAFB' }}>{exam.name}</div>
                    <div className="space-y-2 mb-4 text-sm" style={{ color: '#9CA3AF' }}>
                      <div>{exam.date}</div>
                      <div>{exam.subjects} Subjects</div>
                    </div>
                    <div className="mb-4">
                      <div className="inline-block px-3 py-1 rounded-full text-xs font-semibold"
                           style={{
                             background: exam.status === 'Completed' ? 'rgba(16,185,129,0.15)' : exam.status === 'Ongoing' ? 'rgba(245,158,11,0.15)' : 'rgba(99,102,241,0.15)',
                             color: exam.status === 'Completed' ? '#10B981' : exam.status === 'Ongoing' ? '#F59E0B' : '#6366F1'
                           }}>
                        {exam.status}
                      </div>
                    </div>
                    <button className="text-sm font-medium" style={{ color: '#F59E0B' }}>Configure →</button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeSection === 'reports' && (
            <div>
              <h1 className="text-2xl font-semibold mb-2" style={{ color: '#F9FAFB' }}>Reports</h1>
              <div className="text-sm mb-8" style={{ color: '#9CA3AF' }}>Generate and download academic reports</div>

              <div className="grid grid-cols-4 gap-6 mb-8">
                {[
                  { value: '8.21', label: 'AVERAGE GPA', color: '#6366F1' },
                  { value: '78%', label: 'PASS RATE', color: '#10B981' },
                  { value: '12', label: 'RESULTS PUBLISHED', color: '#8B5CF6' },
                  { value: '3', label: 'STUDENTS AT RISK', color: '#EF4444' },
                ].map((stat, i) => (
                  <div key={i} className="rounded-2xl p-6 relative overflow-hidden"
                       style={{ background: '#111827', border: '1px solid rgba(255,255,255,0.06)', boxShadow: '0 0 0 1px rgba(255,255,255,0.05), 0 4px 24px rgba(0,0,0,0.4)' }}>
                    <div className="absolute top-0 left-0 right-0 h-px" style={{ background: `linear-gradient(90deg, ${stat.color}, transparent)` }} />
                    <div className="text-5xl font-bold mb-2" style={{ fontFamily: 'JetBrains Mono, monospace', color: stat.color }}>{stat.value}</div>
                    <div className="text-xs uppercase" style={{ color: '#9CA3AF', letterSpacing: '0.08em' }}>{stat.label}</div>
                  </div>
                ))}
              </div>

              <div className="rounded-2xl p-8 mb-6" style={{ background: '#111827', border: '1px solid rgba(255,255,255,0.06)' }}>
                <div className="text-xs uppercase font-medium mb-6" style={{ color: '#9CA3AF', letterSpacing: '0.08em' }}>GRADE DISTRIBUTION</div>
                <div className="space-y-3">
                  {gradeChartData.map((item) => {
                    const style = getGradeStyle(item.grade);
                    return (
                      <div key={item.grade} className="flex items-center gap-4">
                        <span className="w-8 text-sm font-semibold" style={{ fontFamily: 'JetBrains Mono, monospace', color: '#F9FAFB' }}>{item.grade}</span>
                        <div className="flex-1 h-8 rounded-lg overflow-hidden" style={{ background: 'rgba(255,255,255,0.05)' }}>
                          <div className="h-full flex items-center px-3 transition-all" style={{ width: `${item.percent}%`, background: style.color }}>
                            <span className="text-xs font-semibold" style={{ color: 'white' }}>{item.percent}%</span>
                          </div>
                        </div>
                        <span className="w-12 text-right text-sm" style={{ fontFamily: 'JetBrains Mono, monospace', color: '#9CA3AF' }}>{item.count}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="flex gap-4">
                <button className="px-8 h-12 rounded-xl text-sm font-semibold"
                        style={{ background: 'linear-gradient(135deg, #F59E0B, #F59E0B)', color: 'white' }}>
                  Generate Report
                </button>
                <button className="px-8 h-12 rounded-xl text-sm font-semibold hover:bg-white/5 transition-colors"
                        style={{ border: '1px solid rgba(255,255,255,0.1)', color: '#F9FAFB' }}>
                  Download CSV
                </button>
              </div>
            </div>
          )}

          {activeSection === 'settings' && (
            <div>
              <h1 className="text-2xl font-semibold mb-2" style={{ color: '#F9FAFB' }}>Settings</h1>
              <div className="text-sm mb-8" style={{ color: '#9CA3AF' }}>System configuration and preferences</div>

              <div className="rounded-2xl p-8" style={{ background: '#111827', border: '1px solid rgba(255,255,255,0.06)' }}>
                <div className="space-y-6">
                  <div>
                    <label className="block text-xs uppercase mb-2" style={{ color: '#9CA3AF', letterSpacing: '0.05em' }}>Institution Name</label>
                    <input type="text" defaultValue="Techno India University" className="w-full h-12 px-4 rounded-xl transition-all"
                      style={{ background: '#1F2937', border: '1px solid rgba(255,255,255,0.08)', color: '#F9FAFB', outline: 'none' }}
                      onFocus={(e) => e.target.style.border = '2px solid #F59E0B'}
                      onBlur={(e) => e.target.style.border = '1px solid rgba(255,255,255,0.08)'} />
                  </div>
                  <div>
                    <label className="block text-xs uppercase mb-2" style={{ color: '#9CA3AF', letterSpacing: '0.05em' }}>Academic Year</label>
                    <input type="text" defaultValue="2025-26" className="w-full h-12 px-4 rounded-xl transition-all"
                      style={{ background: '#1F2937', border: '1px solid rgba(255,255,255,0.08)', color: '#F9FAFB', outline: 'none' }}
                      onFocus={(e) => e.target.style.border = '2px solid #F59E0B'}
                      onBlur={(e) => e.target.style.border = '1px solid rgba(255,255,255,0.08)'} />
                  </div>
                  <div>
                    <label className="block text-xs uppercase mb-2" style={{ color: '#9CA3AF', letterSpacing: '0.05em' }}>Current Semester</label>
                    <input type="text" defaultValue="VI" className="w-full h-12 px-4 rounded-xl transition-all"
                      style={{ background: '#1F2937', border: '1px solid rgba(255,255,255,0.08)', color: '#F9FAFB', outline: 'none' }}
                      onFocus={(e) => e.target.style.border = '2px solid #F59E0B'}
                      onBlur={(e) => e.target.style.border = '1px solid rgba(255,255,255,0.08)'} />
                  </div>
                  <div>
                    <label className="block text-xs uppercase mb-2" style={{ color: '#9CA3AF', letterSpacing: '0.05em' }}>Admin Email</label>
                    <input type="email" defaultValue="admin@tiu.edu.in" className="w-full h-12 px-4 rounded-xl transition-all"
                      style={{ background: '#1F2937', border: '1px solid rgba(255,255,255,0.08)', color: '#F9FAFB', outline: 'none' }}
                      onFocus={(e) => e.target.style.border = '2px solid #F59E0B'}
                      onBlur={(e) => e.target.style.border = '1px solid rgba(255,255,255,0.08)'} />
                  </div>
                </div>
                <div className="flex justify-end mt-8">
                  <button className="px-8 h-12 rounded-xl text-sm font-semibold"
                          style={{ background: 'linear-gradient(135deg, #F59E0B, #FBBF24)', color: 'white' }}>
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-8" onClick={handleCloseModal}>
          <div className="w-full max-w-[800px] rounded-2xl p-8" style={{ background: '#0A0F1E' }} onClick={(e) => e.stopPropagation()}>
            <ResultWizard
              wizardStep={wizardStep}
              setWizardStep={setWizardStep}
              publishConfirmed={publishConfirmed}
              setPublishConfirmed={setPublishConfirmed}
              onBackFromStep2={handleCloseModal}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login/student" element={<LoginPage role="student" />} />
        <Route path="/login/teacher" element={<LoginPage role="teacher" />} />
        <Route path="/login/admin" element={<LoginPage role="admin" />} />
        <Route path="/dashboard/student" element={<StudentDashboard />} />
        <Route path="/dashboard/teacher" element={<TeacherDashboard />} />
        <Route path="/dashboard/admin" element={<AdminDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}
