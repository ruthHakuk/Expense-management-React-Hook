export class Expense {
  static expenseIdCounter = 2;
  expenseId!: number;
  description!: string;
  amount!: number;
  category!: string;
  paymentMethod!: string;
  notes!: string;
  receiptAttachment!: string;
  date!: Date;
  currency!: string;
  location!: string;
  // status!: string;
 

  
    constructor(
      description: string,
        amount: number,
        category: string,
        paymentMethod: string,
        notes: string,
        receiptAttachment: string,
        date: Date,
        currency: string,
        location: string,
        // status: string,

    ) {
      this.expenseId = Expense.expenseIdCounter++;
        this.description = description;
        this.amount = amount;
        this.category = category;
        this.paymentMethod = paymentMethod;
        this.notes = notes;
        this.receiptAttachment = receiptAttachment;
        this.date = date;
        this.currency = currency;
        this.location = location;
        // this.status = status;
       
    }
    
 
  }













  
  