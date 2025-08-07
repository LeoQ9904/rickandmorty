import Back from '@/components/Back';
export default function Loading() {
  return (
    <div className="min-h-screen p-8">
      <Back />
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
        </div>
      </div>
    </div>
  );
}
