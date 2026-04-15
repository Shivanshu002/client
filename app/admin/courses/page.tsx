'use client';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCoursesStart, addCourseStart, updateCourseStart, deleteCourseStart, Course } from '@/features/courses/coursesSlice';
import { RootState } from '@/store/rootReducer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

const empty = { title: '', duration: '', fees: '', description: '', category: '' };

export default function AdminCoursesPage() {
  const dispatch = useDispatch();
  const { data: courses, loading } = useSelector((s: RootState) => s.courses);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<Course | null>(null);
  const [form, setForm] = useState(empty);

  useEffect(() => { dispatch(fetchCoursesStart()); }, [dispatch]);

  const openAdd = () => { setEditing(null); setForm(empty); setDialogOpen(true); };
  const openEdit = (c: Course) => { setEditing(c); setForm({ title: c.title, duration: c.duration, fees: String(c.fees), description: c.description, category: c.category }); setDialogOpen(true); };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const payload = { ...form, fees: Number(form.fees) };
    if (editing) {
      dispatch(updateCourseStart({ id: editing._id, body: payload }));
    } else {
      dispatch(addCourseStart(payload));
    }
    setDialogOpen(false);
  };

  const handleDelete = (id: string) => {
    if (confirm('Delete this course?')) dispatch(deleteCourseStart(id));
  };

  const f = (k: keyof typeof empty) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm(prev => ({ ...prev, [k]: e.target.value }));

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <div>
          <h1 className="text-3xl font-bold">Admin — Courses</h1>
          <div className="flex gap-3 mt-1">
            <Link href="/admin/courses" className="text-sm text-blue-600 font-medium">Courses</Link>
            <Link href="/admin/inquiries" className="text-sm text-gray-500 hover:text-blue-600">Inquiries</Link>
          </div>
        </div>
        <Button onClick={openAdd}>+ Add Course</Button>
      </div>

      <div className="rounded-xl border bg-white shadow-sm overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Duration</TableHead>
              <TableHead>Fees</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading
              ? <TableRow><TableCell colSpan={5} className="text-center py-8 text-gray-400">Loading...</TableCell></TableRow>
              : courses.map(c => (
                  <TableRow key={c._id}>
                    <TableCell className="font-medium">{c.title}</TableCell>
                    <TableCell><Badge variant="secondary">{c.category}</Badge></TableCell>
                    <TableCell>{c.duration}</TableCell>
                    <TableCell>₹{c.fees.toLocaleString()}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" onClick={() => openEdit(c)}>Edit</Button>
                        <Button size="sm" variant="destructive" onClick={() => handleDelete(c._id)}>Delete</Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
            }
          </TableBody>
        </Table>
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editing ? 'Edit Course' : 'Add New Course'}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-3">
            <Input placeholder="Course Title" required value={form.title} onChange={f('title')} />
            <Input placeholder="Category (e.g. Web Development)" required value={form.category} onChange={f('category')} />
            <Input placeholder="Duration (e.g. 3 Months)" required value={form.duration} onChange={f('duration')} />
            <Input placeholder="Fees (₹)" type="number" required value={form.fees} onChange={f('fees')} />
            <Textarea placeholder="Description" required value={form.description} onChange={f('description')} />
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
              <Button type="submit">{editing ? 'Update' : 'Add Course'}</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
