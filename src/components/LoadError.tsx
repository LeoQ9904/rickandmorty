import Back from '@/components/Back';
export default function LoadError({ message }: { message: string }) {
  return (
    <div className="min-h-screen p-8">
      <Back />
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 pt-4">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-600">{message}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
