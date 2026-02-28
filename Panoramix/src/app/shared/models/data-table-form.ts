export interface DataTableForm {
    id: string,
    table: string,
    headers: [
      {
        name: string,
        type: Number,
      }
    ],
    log: {
      createdAt: Date,
      updatedAt: Date,
      createdBy: Date,
      updatedBy: Date,
    }
}
