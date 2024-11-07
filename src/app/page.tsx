'use client';
import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";
import { usePathname } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  const pathname = usePathname();
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div>
          <h1>Case Study web application name</h1>
          <button onClick={() => router.push('/addEmployee')}>Add Employee</button>
          <button onClick={() => router.push('/searchEmployee')}>Search Employees</button>
        </div>
      </main>
    </div>
  );
}
