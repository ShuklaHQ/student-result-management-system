This needs a proper state lift — marks data needs to live at the App level so changes reflect everywhere. Here's the complete fix prompt:

---

This is a critical fix. Right now marks are hardcoded separately inside StudentDashboard and TeacherDashboard so they never sync. The fix requires lifting marks to shared global state at the App level. Follow these exact steps:

**Step 1 — Create shared marks state at the App level**

In the `App` component, define the shared marks data as state:

```tsx
const [marksData, setMarksData] = useState([
  { roll: '1350', name: 'Himanshu Shukla',   DS: { internal: 28, external: 65 }, Algo: { internal: 26, external: 62 }, DBMS: { internal: 25, external: 58 } },
  { roll: '1351', name: 'Md. Arieeb Ali',    DS: { internal: 26, external: 62 }, Algo: { internal: 24, external: 60 }, DBMS: { internal: 23, external: 57 } },
  { roll: '1352', name: 'Shagun Shaw',        DS: { internal: 25, external: 58 }, Algo: { internal: 22, external: 55 }, DBMS: { internal: 24, external: 56 } },
  { roll: '1353', name: 'Rishi Kedia',        DS: { internal: 27, external: 60 }, Algo: { internal: 25, external: 58 }, DBMS: { internal: 26, external: 59 } },
  { roll: '1354', name: 'Shubham Kumar',      DS: { internal: 24, external: 55 }, Algo: { internal: 23, external: 54 }, DBMS: { internal: 22, external: 53 } },
  { roll: '1355', name: 'Priya Verma',        DS: { internal: 29, external: 67 }, Algo: { internal: 28, external: 66 }, DBMS: { internal: 27, external: 65 } },
  { roll: '1356', name: 'Rahul Singh',        DS: { internal: 23, external: 54 }, Algo: { internal: 22, external: 52 }, DBMS: { internal: 21, external: 51 } },
  { roll: '1357', name: 'Sneha Patel',        DS: { internal: 27, external: 63 }, Algo: { internal: 26, external: 61 }, DBMS: { internal: 25, external: 60 } },
]);
```

Pass `marksData` and `setMarksData` as props to both `StudentDashboard` and `TeacherDashboard` via their route elements:
```tsx
<Route path="/dashboard/student" element={<StudentDashboard marksData={marksData} />} />
<Route path="/dashboard/teacher" element={<TeacherDashboard marksData={marksData} setMarksData={setMarksData} />} />
```

---

**Step 2 — Fix the Student Dashboard to use shared marks**

Update `StudentDashboard` to accept `marksData` as a prop. Replace the hardcoded `subjects` array with computed values from `marksData`. Find Himanshu's row (`roll === '1350'`) and map it to subjects:

```tsx
const himanshu = marksData.find(s => s.roll === '1350')!;
const subjects = [
  { code: 'CS601', name: 'Data Structures',              internal: himanshu.DS.internal,   external: himanshu.DS.external,   max: 100, credits: 4, teacher: 'Rituparna Bhattacharya' },
  { code: 'CS602', name: 'Design & Analysis of Algorithms', internal: himanshu.Algo.internal, external: himanshu.Algo.external, max: 100, credits: 4, teacher: 'Rituparna Bhattacharya' },
  { code: 'CS603', name: 'Database Management Systems',  internal: himanshu.DBMS.internal, external: himanshu.DBMS.external, max: 100, credits: 4, teacher: 'Dr. Priya Sharma' },
  { code: 'CS604', name: 'Operating Systems',            internal: 27, external: 60, max: 100, credits: 4, teacher: 'Dr. Rahul Singh' },
  { code: 'MA601', name: 'Engineering Mathematics VI',   internal: 24, external: 55, max: 100, credits: 3, teacher: 'Dr. Anjali Verma' },
  { code: 'CS605', name: 'Software Engineering',         internal: 29, external: 67, max: 100, credits: 4, teacher: 'Rituparna Bhattacharya' },
];
```

Now derive the grade using `getGradeStyle` and `getGrade` based on computed totals — no more hardcoded grade strings.

---

**Step 3 — Fix Teacher Dashboard: Mark Entry Modal**

Update `TeacherDashboard` to accept `marksData` and `setMarksData` as props.

Add two new state variables:
```tsx
const [showMarksModal, setShowMarksModal] = useState(false);
const [modalSubject, setModalSubject] = useState<'DS' | 'Algo' | 'DBMS'>('DS');
const [draftMarks, setDraftMarks] = useState(marksData);
```

When the teacher clicks "Enter Marks →" on any subject card, do this:
```tsx
onClick={() => {
  setModalSubject(subjectKey); // 'DS', 'Algo', or 'DBMS'
  setDraftMarks(marksData);    // load current marks into draft
  setShowMarksModal(true);
}}
```

---

**Step 4 — Build the Mark Entry Modal**

Add a modal that appears when `showMarksModal === true`. Style it as a full overlay `fixed inset-0 bg-black/60 z-50 flex items-center justify-center`. The inner panel is `max-w-[860px] w-full rounded-2xl p-8` with `background: #111827`.

Modal header:
- Title: `"Enter Marks — [Subject Name]"` in Inter 600 24px white
- Subtitle: `"Semester VI  ·  48 students"` in muted 14px
- Close `×` button top-right

Inside modal: a full-width table with columns `Roll No | Student Name | Internal /30 | External /70 | Total /100 | Grade`. Render from `draftMarks`. Each Internal and External cell is an editable input:

```tsx
<input
  type="number"
  min={0}
  max={subject === 'internal' ? 30 : 70}
  value={draftMarks.find(s => s.roll === student.roll)![modalSubject].internal}
  onChange={(e) => {
    setDraftMarks(prev => prev.map(s =>
      s.roll === student.roll
        ? { ...s, [modalSubject]: { ...s[modalSubject], internal: Number(e.target.value) } }
        : s
    ));
  }}
  className="w-16 text-right bg-transparent outline-none"
  style={{ fontFamily: 'JetBrains Mono, monospace', color: '#F9FAFB', borderBottom: '2px solid transparent' }}
  onFocus={(e) => e.target.style.borderBottom = '2px solid #8B5CF6'}
  onBlur={(e) => e.target.style.borderBottom = '2px solid transparent'}
/>
```

Total column: `draftMarks` internal + external for that student and subject, auto-computed, shown in muted non-editable cell.

Grade column: auto-computed using `getGrade(total)` and styled using `getGradeStyle(grade)`.

---

**Step 5 — Save button updates global state**

At the bottom of the modal, two buttons:

```tsx
<button onClick={() => setShowMarksModal(false)}
  style={{ border: '1px solid rgba(255,255,255,0.1)', color: '#F9FAFB' }}>
  Cancel
</button>

<button onClick={() => {
  setMarksData(draftMarks);   // push draft to global state
  setShowMarksModal(false);   // close modal
}}
  style={{ background: 'linear-gradient(135deg, #8B5CF6, #A78BFA)', color: 'white' }}>
  Save Marks ✓
</button>
```

Below Save button: small text `"Changes will reflect on student dashboards immediately."` in muted 12px.

---

**Step 6 — Show a success toast after saving**

After `setMarksData(draftMarks)` is called, also set a `savedToast` state to `true` for 3 seconds:

```tsx
const [savedToast, setSavedToast] = useState(false);

// inside save handler:
setMarksData(draftMarks);
setShowMarksModal(false);
setSavedToast(true);
setTimeout(() => setSavedToast(false), 3000);
```

Render the toast as a fixed bottom-right notification:
```tsx
{savedToast && (
  <div className="fixed bottom-6 right-6 flex items-center gap-3 px-6 py-4 rounded-2xl z-50"
       style={{ background: '#111827', border: '1px solid rgba(16,185,129,0.3)', boxShadow: '0 4px 24px rgba(0,0,0,0.4)' }}>
    <CheckCircle size={18} style={{ color: '#10B981' }} />
    <span className="text-sm font-medium" style={{ color: '#F9FAFB' }}>Marks saved successfully</span>
  </div>
)}
```

---

Do not change any colors, typography, or existing layout. Only add the modal, lift marks state to App level, and wire up the save flow.