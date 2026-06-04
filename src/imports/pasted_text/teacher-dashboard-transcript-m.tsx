Two clear issues. Here's the fix prompt:

---

Fix the following two issues in the Teacher Dashboard:

**Fix 1 — "View" button in Transcripts section**

Currently the View button is just `<button style={{ color: '#8B5CF6' }}>View</button>` with no onClick. Fix it by opening a modal showing that student's full result breakdown.

Add state:
```tsx
const [viewStudent, setViewStudent] = useState<typeof students[0] | null>(null);
```

Change the View button to:
```tsx
<button onClick={() => setViewStudent(student)} 
        className="text-sm font-medium hover:underline" 
        style={{ color: '#8B5CF6' }}>
  View
</button>
```

Add this modal at the bottom of the TeacherDashboard JSX, before the closing `</div>`:
```tsx
{viewStudent && (
  <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-8"
       onClick={() => setViewStudent(null)}>
    <div className="w-full max-w-[560px] rounded-2xl p-8"
         style={{ background: '#111827', border: '1px solid rgba(255,255,255,0.06)' }}
         onClick={e => e.stopPropagation()}>

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="text-xl font-semibold" style={{ color: '#F9FAFB' }}>{viewStudent.name}</div>
          <div className="text-sm mt-1" style={{ color: '#9CA3AF' }}>
            Roll: <span style={{ fontFamily: 'JetBrains Mono, monospace' }}>{viewStudent.roll}</span>
            &nbsp;·&nbsp;Semester {viewStudent.semester}&nbsp;·&nbsp;B.Tech CSE
          </div>
        </div>
        <button onClick={() => setViewStudent(null)} 
                className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white/5"
                style={{ color: '#9CA3AF', fontSize: '18px' }}>×</button>
      </div>

      {/* GPA card */}
      <div className="rounded-xl p-4 mb-6 flex items-center justify-between"
           style={{ background: 'rgba(139,92,246,0.08)', border: '1px solid rgba(139,92,246,0.2)' }}>
        <span className="text-sm uppercase" style={{ color: '#9CA3AF', letterSpacing: '0.06em' }}>Semester GPA</span>
        <span className="text-3xl font-bold" style={{ fontFamily: 'JetBrains Mono, monospace', color: '#8B5CF6' }}>
          {viewStudent.gpa}
        </span>
      </div>

      {/* Subject breakdown table */}
      <div className="rounded-xl overflow-hidden" style={{ border: '1px solid rgba(255,255,255,0.06)' }}>
        <table className="w-full">
          <thead>
            <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', background: 'rgba(255,255,255,0.02)' }}>
              <th className="text-left px-4 py-3 text-xs uppercase" style={{ color: '#9CA3AF' }}>Subject</th>
              <th className="text-right px-4 py-3 text-xs uppercase" style={{ color: '#9CA3AF' }}>Internal</th>
              <th className="text-right px-4 py-3 text-xs uppercase" style={{ color: '#9CA3AF' }}>External</th>
              <th className="text-right px-4 py-3 text-xs uppercase" style={{ color: '#9CA3AF' }}>Total</th>
              <th className="text-center px-4 py-3 text-xs uppercase" style={{ color: '#9CA3AF' }}>Grade</th>
            </tr>
          </thead>
          <tbody>
            {[
              { name: 'Data Structures', key: 'DS' },
              { name: 'Algorithms',      key: 'Algo' },
              { name: 'DBMS',            key: 'DBMS' },
            ].map((subj, i) => {
              const marks = marksData.find(m => m.roll === viewStudent.roll)![subj.key as 'DS'|'Algo'|'DBMS'];
              const total = marks.internal + marks.external;
              const grade = getGrade(total);
              return (
                <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                  <td className="px-4 py-3 text-sm" style={{ color: '#F9FAFB' }}>{subj.name}</td>
                  <td className="px-4 py-3 text-right text-sm" style={{ fontFamily: 'JetBrains Mono, monospace', color: '#F9FAFB' }}>{marks.internal}</td>
                  <td className="px-4 py-3 text-right text-sm" style={{ fontFamily: 'JetBrains Mono, monospace', color: '#F9FAFB' }}>{marks.external}</td>
                  <td className="px-4 py-3 text-right text-sm font-semibold" style={{ fontFamily: 'JetBrains Mono, monospace', color: '#F9FAFB' }}>{total}</td>
                  <td className="px-4 py-3 text-center">
                    <span className="inline-block px-2 py-0.5 rounded-full text-xs font-semibold" style={getGradeStyle(grade)}>{grade}</span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Status badge */}
      <div className="flex items-center justify-between mt-6">
        <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold"
              style={{ background: 'rgba(16,185,129,0.15)', color: '#10B981' }}>
          {viewStudent.status}
        </span>
        <button onClick={() => setViewStudent(null)}
                className="px-6 h-10 rounded-xl text-sm font-semibold"
                style={{ background: 'linear-gradient(135deg, #8B5CF6, #A78BFA)', color: 'white' }}>
          Close
        </button>
      </div>
    </div>
  </div>
)}
```

---

**Fix 2 — Grade Distribution bars in Subjects section not showing**

The bars have `height: (count/maxCount) * 100%` but the parent container has a fixed `h-12` (48px) with `flex items-end`. The bars are rendering but too tiny to see because the percentage height inside a flex container doesn't resolve correctly without an explicit pixel height on the parent.

Fix the grade distribution chart in each subject card by replacing the bar container with this:

```tsx
<div className="flex items-end gap-1" style={{ height: '48px' }}>
  {gradeData.map((item, idx) => {
    const style = getGradeStyle(item.grade);
    const barHeight = Math.max(4, (item.count / maxCount) * 44); // pixels, min 4px
    return (
      <div key={idx} className="flex-1 flex flex-col items-center gap-1">
        <div className="w-full rounded-t"
             style={{ height: `${barHeight}px`, background: style.color }} />
        <div className="text-xs" style={{ color: '#9CA3AF', fontFamily: 'JetBrains Mono, monospace', fontSize: '9px' }}>
          {item.grade}
        </div>
      </div>
    );
  })}
</div>
```

The key change is using computed pixel heights (`barHeight` in px) instead of percentage heights, which fixes the rendering inside flex containers. Do not change colors or any other part of the subject cards.