import { Card, CardContent } from '@/components/ui/card';
import { AlertCircle } from 'lucide-react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-md mx-4">
        <CardContent className="pt-6 text-center">
          <div className="flex flex-col items-center mb-4 gap-2">
            <AlertCircle className="h-10 w-10 text-red-500" />
            <h1 className="text-2xl font-bold text-gray-900">
              الصفحة غير موجودة (404)
            </h1>
          </div>

          <p className="mt-2 text-sm text-gray-600">
            الصفحة التي تبحث عنها غير موجودة أو تم نقلها.
          </p>

          <div className="mt-6">
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-full bg-[#6518ac] px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-[#4e0d90] transition-colors"
            >
              العودة للرئيسية
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
