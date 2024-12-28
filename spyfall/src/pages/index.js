'use client';

import { useRouter } from 'next/router';

import {
  useEffect,
} from 'react';

export default function BigFloppyWeiner() {
  const router = useRouter();
  useEffect(() => {
    router.push('/home');
  }, [router]);
  return <div>Redirecting...</div>;
  
}