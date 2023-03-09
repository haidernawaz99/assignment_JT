declare global {
  interface Date {
    getTime(start?: number): [Date, Date];
  }
}
