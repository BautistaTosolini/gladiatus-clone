import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import SignIn from '@/components/forms/SignIn';
import { getUser } from '@/lib/actions/user/getUser.action';
import { redirect } from 'next/navigation';

const Page = async () => {
  const user = await getUser().catch(() => {});

  if (user) redirect('/game/overview');

  return (
    <Card className='w-[350px] rounded-sm cream-card'>
      <CardHeader>
        <CardTitle>Sing In</CardTitle>
        <CardDescription className='text-red'>Gladiatus Clone</CardDescription>
      </CardHeader>
      <CardContent>
        <SignIn />
      </CardContent>
    </Card>
  )
};

export default Page;