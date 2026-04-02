import axios from "axios";
import { useState } from "react";

function EditModal({ app, close, refresh }) {
  const [form, setForm] = useState(app);

  const update = async () => {
    await axios.put(`http://localhost:8080/api/applications/${app.id}`, form);
    refresh();
    close();
  };

  return (
    <div className="modal">
      <input value={form.studentName}
        onChange={e => setForm({...form, studentName:e.target.value})} />
      <input value={form.company}
        onChange={e => setForm({...form, company:e.target.value})} />
      <button onClick={update}>Update</button>
      <button onClick={close}>Cancel</button>
    </div>
  );
}

export default EditModal;