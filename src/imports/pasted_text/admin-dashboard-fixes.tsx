Here's the complete Admin audit and fix prompt:

---

Fix all non-functional buttons and interactions in the Admin Dashboard. Go through each section carefully:

---

**USERS SECTION**

**Edit (pencil) button — full fix**

Currently the edit button has no onClick. Fix it properly:

Add state:
```tsx
const [editUser, setEditUser] = useState<typeof users[0] | null>(null);
const [editForm, setEditForm] = useState({ name: '', role: '', department: '', email: '', status: '' });
```

Change the pencil button to:
```tsx
<button onClick={() => {
  setEditUser(user);
  setEditForm({ name: user.name, role: user.role, department: user.department, email: user.email, status: user.status });
}}
style={{ color: '#F59E0B' }}>
  <Edit2 size={16} />
</button>
```

Add an Edit User modal:
```tsx
{editUser && (
  <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-8"
       onClick={() => setEditUser(null)}>
    <div className="w-full max-w-[480px] rounded-2xl p-8"
         style={{ background: '#111827', border: '1px solid rgba(255,255,255,0.06)' }}
         onClick={e => e.stopPropagation()}>
      <div className="flex items-center justify-between mb-6">
        <div className="text-xl font-semibold" style={{ color: '#F9FAFB' }}>Edit User</div>
        <button onClick={() => setEditUser(null)} style={{ color: '#9CA3AF', fontSize: '18px' }}>×</button>
      </div>
      <div className="space-y-4">
        {[
          { label: 'Full Name', field: 'name', type: 'text' },
          { label: 'Department', field: 'department', type: 'text' },
          { label: 'Email', field: 'email', type: 'email' },
        ].map(({ label, field, type }) => (
          <div key={field}>
            <label className="block text-xs uppercase mb-2" style={{ color: '#9CA3AF', letterSpacing: '0.05em' }}>{label}</label>
            <input type={type} value={editForm[field as keyof typeof editForm]}
              onChange={e => setEditForm(prev => ({ ...prev, [field]: e.target.value }))}
              className="w-full h-12 px-4 rounded-xl"
              style={{ background: '#1F2937', border: '1px solid rgba(255,255,255,0.08)', color: '#F9FAFB', outline: 'none' }}
              onFocus={e => e.target.style.border = '2px solid #F59E0B'}
              onBlur={e => e.target.style.border = '1px solid rgba(255,255,255,0.08)'} />
          </div>
        ))}
        <div>
          <label className="block text-xs uppercase mb-2" style={{ color: '#9CA3AF', letterSpacing: '0.05em' }}>Role</label>
          <select value={editForm.role} onChange={e => setEditForm(prev => ({ ...prev, role: e.target.value }))}
            className="w-full h-12 px-4 rounded-xl"
            style={{ background: '#1F2937', border: '1px solid rgba(255,255,255,0.08)', color: '#F9FAFB', outline: 'none' }}>
            <option value="Student">Student</option>
            <option value="Faculty">Faculty</option>
          </select>
        </div>
        <div>
          <label className="block text-xs uppercase mb-2" style={{ color: '#9CA3AF', letterSpacing: '0.05em' }}>Status</label>
          <select value={editForm.status} onChange={e => setEditForm(prev => ({ ...prev, status: e.target.value }))}
            className="w-full h-12 px-4 rounded-xl"
            style={{ background: '#1F2937', border: '1px solid rgba(255,255,255,0.08)', color: '#F9FAFB', outline: 'none' }}>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>
      </div>
      <div className="flex gap-3 mt-8">
        <button onClick={() => setEditUser(null)}
          className="flex-1 h-12 rounded-xl text-sm font-semibold"
          style={{ border: '1px solid rgba(255,255,255,0.1)', color: '#F9FAFB' }}>Cancel</button>
        <button onClick={() => {
          setUsers(prev => prev.map(u => u.name === editUser.name ? { ...u, ...editForm } : u));
          setEditUser(null);
          showToastMessage('User updated successfully');
        }}
          className="flex-1 h-12 rounded-xl text-sm font-semibold"
          style={{ background: 'linear-gradient(135deg, #F59E0B, #FBBF24)', color: 'white' }}>
          Save Changes
        </button>
      </div>
    </div>
  </div>
)}
```

Also convert `users` from `const` to `useState` so edits and additions persist:
```tsx
const [users, setUsers] = useState([...existing users array...]);
```

---

**+ Add User button — full fix**

Add state:
```tsx
const [showAddUser, setShowAddUser] = useState(false);
const [newUser, setNewUser] = useState({ name: '', role: 'Student', department: 'CSE', email: '' });
```

Wire the button: `onClick={() => setShowAddUser(true)}`

Add modal same structure as Edit User but with empty fields and title "Add New User". On confirm:
```tsx
setUsers(prev => [...prev, { ...newUser, status: 'Active' }]);
setShowAddUser(false);
setNewUser({ name: '', role: 'Student', department: 'CSE', email: '' });
showToastMessage('User added successfully');
```

---

**EXAM SETUP SECTION**

Convert `exams` to `useState`:
```tsx
const [exams, setExams] = useState([...existing exams array...]);
```

Add state for edit modal:
```tsx
const [editExam, setEditExam] = useState<typeof exams[0] | null>(null);
const [examForm, setExamForm] = useState({ name: '', date: '', subjects: 0, status: '' });
```

Wire "Configure →" button:
```tsx
onClick={() => {
  setEditExam(exam);
  setExamForm({ name: exam.name, date: exam.date, subjects: exam.subjects, status: exam.status });
}}
```

Add exam edit modal `max-w-[440px]` with fields for Exam Name (text), Date (text), Subjects (number), Status (dropdown: Scheduled/Ongoing/Completed). On Save:
```tsx
setExams(prev => prev.map(e => e.name === editExam.name ? { ...e, ...examForm } : e));
setEditExam(null);
showToastMessage('Exam updated successfully');
```

---

**RESULTS SECTION — Publication Wizard**

After clicking "Confirm & Publish" (checkbox confirmed), replace Step 3 content with a success screen:
```tsx
{publishSuccess ? (
  <div className="flex flex-col items-center py-8">
    <div className="w-[72px] h-[72px] rounded-full flex items-center justify-center mb-6"
         style={{ background: 'rgba(16,185,129,0.15)', boxShadow: '0 0 0 8px rgba(16,185,129,0.1)' }}>
      <CheckCircle size={32} style={{ color: '#10B981' }} />
    </div>
    <h2 className="font-bold text-center mb-3" style={{ fontSize: '28px', color: '#F9FAFB' }}>
      Results Published!
    </h2>
    <p className="text-sm text-center mb-2" style={{ color: '#9CA3AF' }}>
      Semester VI results are now visible to all 48 students.
    </p>
    <p className="text-xs mb-8" style={{ fontFamily: 'JetBrains Mono, monospace', color: '#4B5563' }}>
      Published at: {new Date().toLocaleTimeString()}
    </p>
    <button onClick={() => { setActiveSection('dashboard'); setPublishSuccess(false); resetWizard(); }}
            className="px-8 h-12 rounded-xl text-sm font-semibold"
            style={{ background: 'linear-gradient(135deg, #6366F1, #8B5CF6)', color: 'white' }}>
      Back to Dashboard
    </button>
  </div>
) : ( ...existing step 3 JSX... )}
```

Add `publishSuccess` state: `const [publishSuccess, setPublishSuccess] = useState(false)`. Set it to `true` on Confirm & Publish click. Also prepend to activities:
```tsx
setActivities(prev => [
  { type: 'success', text: 'Semester VI results published', time: 'just now' },
  ...prev
]);
```

---

**REPORTS SECTION**

Fix the Generate Report download — it currently uses `#F59E0B, #F59E0B` (identical stops). Change to `linear-gradient(135deg, #F59E0B, #FBBF24)`.

Wire both download buttons properly using the Blob pattern if not already done.

---

**SETTINGS SECTION**

Wire Save Changes to show toast: `showToastMessage('System settings updated')`.

---

**SHARED TOAST HELPER**

Define a single helper in AdminDashboard to avoid repetition:
```tsx
const [toastMsg, setToastMsg] = useState('');
const [toastVisible, setToastVisible] = useState(false);

const showToastMessage = (msg: string) => {
  setToastMsg(msg);
  setToastVisible(true);
  setTimeout(() => setToastVisible(false), 3000);
};
```

Render once at the bottom of the dashboard JSX:
```tsx
<Toast message={toastMsg} visible={toastVisible} />
```

Do not change any colors, fonts, layout, or existing working functionality.