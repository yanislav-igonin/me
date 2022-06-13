interface Props {
  children: React.ReactNode;
}

export const Card = ({ children }: Props) => <div className="p-20 min-w-max shadow-md bg-white dark:bg-slate-600">
  {children}
</div>;
