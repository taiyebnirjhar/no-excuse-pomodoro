interface FormErrorProps {
  message?: string;
}

export function FormError({ message }: FormErrorProps) {
  if (!message) return null;

  return <div className="text-sm text-red-500 mt-1">{message}</div>;
}
