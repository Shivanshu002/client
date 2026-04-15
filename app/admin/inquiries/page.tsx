'use client';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchInquiriesStart } from '@/features/inquiries/inquiriesSlice';
import { RootState } from '@/store/rootReducer';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

export default function AdminInquiriesPage() {
  const dispatch = useDispatch();
  const { data: inquiries, loading } = useSelector((s: RootState) => s.inquiries);

  useEffect(() => { dispatch(fetchInquiriesStart()); }, [dispatch]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Admin — Inquiries</h1>
        <div className="flex gap-3 mt-1">
          <Link href="/admin/courses" className="text-sm text-gray-500 hover:text-blue-600">Courses</Link>
          <Link href="/admin/inquiries" className="text-sm text-blue-600 font-medium">Inquiries</Link>
        </div>
      </div>

      <div className="rounded-xl border bg-white shadow-sm overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Course</TableHead>
              <TableHead>Message</TableHead>
              <TableHead>Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading
              ? <TableRow><TableCell colSpan={6} className="text-center py-8 text-gray-400">Loading...</TableCell></TableRow>
              : inquiries.length === 0
                ? <TableRow><TableCell colSpan={6} className="text-center py-8 text-gray-400">No inquiries yet.</TableCell></TableRow>
                : inquiries.map(inq => (
                    <TableRow key={inq._id}>
                      <TableCell className="font-medium">{inq.name}</TableCell>
                      <TableCell>{inq.email}</TableCell>
                      <TableCell>{inq.phone}</TableCell>
                      <TableCell><Badge variant="secondary">{inq.courseOfInterest}</Badge></TableCell>
                      <TableCell className="max-w-xs truncate text-gray-500">{inq.message || '—'}</TableCell>
                      <TableCell className="text-gray-400 text-xs whitespace-nowrap">
                        {new Date(inq.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                      </TableCell>
                    </TableRow>
                  ))
            }
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
