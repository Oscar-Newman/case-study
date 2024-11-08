'use client';
import React from "react";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";

export default function Home() {
  const router = useRouter();
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
