// import React, { useEffect, useState } from 'react'
// import Header from '../components/Header'
// import Cards from '../components/cards'
// import { Modal } from 'antd';
// import AddExpenseModal from '../components/Modals/addExpense';
// import AddIncomeModal from '../components/Modals/addIncome';
// import { addDoc, collection, getDocs, query } from 'firebase/firestore';
// import { auth, db } from '../firebase';
// import { useAuthState } from 'react-firebase-hooks/auth';
// import { toast } from 'react-toastify';
// import TransactionsTable from '../components/TransactionsTable';


// function Dashboard() {
//   const [transactions, setTransactions] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [user] = useAuthState(auth);
//   const [isExpenseModalVisible, setIsExpenseModalVisible] = useState(false);
//   const [isIncomeModalVisible, setIsIncomeModalVisible] = useState(false);
//   const [income, setIncome] = useState(0);
//   const [expense, setExpenses] = useState(0);
//   const [totalBalance, setCurrentBalance] = useState(0);

//   const showExpenseModal = () => {
//     setIsExpenseModalVisible(true);
//   };

//   const showIncomeModal = () => {
//     setIsIncomeModalVisible(true);
//   };

//   const handleExpenseCancel = () => {
//     setIsExpenseModalVisible(false);
//   };

//   const handleIncomeCancel = () => {
//     setIsIncomeModalVisible(false);
//   };
//   const onFinish = (values, type) => {
//     const newTransaction = {
//       type: type,
//       date: values.date.format("YYYY-MM-DD"),
//       amount: parseFloat(values.amount),
//       tag: values.tag,
//       name: values.name,
//     };
//     addTransaction(newTransaction);
//   };

//   async function addTransaction(transaction, many) {
//     try {
//       const docRef = await addDoc(
//         collection(db, `users/${user.uid}/transactions`),
//         transaction
//       );
//       console.log("Document written with ID: ", docRef.id);
//       if (!many) toast.success("Transaction added successfully");
//       let newArr = transactions;
//       newArr.push(transaction);
//       setTransactions(newArr);
//       fetchTransactions();
//     } catch (e) {
//       console.error("Error adding document: ", e);
//       if (!many) toast.error("Error adding transaction");
//     }
//   }

//   useEffect(() => {
//     if (user)
//       fetchTransactions();
//   }, [user]);

//   useEffect(() => {
//     calculateBalance();
//   }, [transactions]);

//   const calculateBalance = () => {
//     let incomeTotal = 0;
//     let expensesTotal = 0;

//     transactions.forEach((transaction) => {
//       if (transaction.type === "income") {
//         incomeTotal += transaction.amount;
//       } else {
//         expensesTotal += transaction.amount;
//       }
//     });

//     setIncome(incomeTotal);
//     setExpenses(expensesTotal);
//     setCurrentBalance(incomeTotal - expensesTotal);
//   };
//   async function fetchTransactions() {
//     setLoading(true);
//     if (user) {
//       const q = query(collection(db, `users/${user.uid}/transactions`));
//       const querySnapshot = await getDocs(q);
//       let transactionsArray = [];
//       querySnapshot.forEach((doc) => {
//         transactionsArray.push(doc.data());
//       });
//       setTransactions(transactionsArray);
//       console.log(transactionsArray);

//       toast.success("Transactions Fetched!");
//     }
//     setLoading(false);
//   }

//   return (
//     <div>
//       <Header />
//       {loading ? (
//         <p>Loading...</p>
//       ) : (
//         <>
//           <Cards
//             income={income}
//             expense={expense}
//             totalBalance={totalBalance}
//             showExpenseModal={showExpenseModal}
//             showIncomeModal={showIncomeModal}
//           />
//           <AddExpenseModal
//             isExpenseModalVisible={isExpenseModalVisible}
//             handleExpenseCancel={handleExpenseCancel}
//             onFinish={onFinish}
//           />
//           <AddIncomeModal
//             isIncomeModalVisible={isIncomeModalVisible}
//             handleIncomeCancel={handleIncomeCancel}
//             onFinish={onFinish}
//           />
//           <TransactionsTable transactions={transactions}
//             addTransaction={addTransaction}
//             fetchTransactions={fetchTransactions}
//           />
//         </>
//       )}
//     </div>
//   )
// }

// export default Dashboard












// Dashboard.js

// import React, { useEffect, useState } from 'react'
// import Header from '../components/Header'
// import Cards from '../components/cards'
// import { Modal } from 'antd';
// import AddExpenseModal from '../components/Modals/addExpense';
// import AddIncomeModal from '../components/Modals/addIncome';
// import { addDoc, collection, getDocs, query } from 'firebase/firestore';
// import { auth, db } from '../firebase';
// import { useAuthState } from 'react-firebase-hooks/auth';
// import { toast } from 'react-toastify';
// import TransactionsTable from '../components/TransactionsTable';

// // Import Chart.js components
// import { Line, Pie } from 'react-chartjs-2';
// import { Chart, CategoryScale, LinearScale, PointElement, LineElement, ArcElement, Tooltip, Legend } from 'chart.js';
// Chart.register(CategoryScale, LinearScale, PointElement, LineElement, ArcElement, Tooltip, Legend);

// function Dashboard() {
//   const [transactions, setTransactions] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [user] = useAuthState(auth);
//   const [isExpenseModalVisible, setIsExpenseModalVisible] = useState(false);
//   const [isIncomeModalVisible, setIsIncomeModalVisible] = useState(false);
//   const [income, setIncome] = useState(0);
//   const [expense, setExpenses] = useState(0);
//   const [totalBalance, setCurrentBalance] = useState(0);


//   const dateWiseExpense = {};

//   const categoryWiseExpense = {};

//   transactions.forEach((transaction) => {
//     if (transaction.type === 'expense') {
//       // Date-wise
//       const date = transaction.date;
//       dateWiseExpense[date] = (dateWiseExpense[date] || 0) + transaction.amount;
//       // Category-wise
//       const tag = transaction.tag || 'Other';
//       categoryWiseExpense[tag] = (categoryWiseExpense[tag] || 0) + transaction.amount;
//     }
//   });






//   const lineChartData = {
//     labels: Object.keys(dateWiseExpense).sort(),
//     datasets: [
//       {
//         label: 'Expense',
//         data: Object.keys(dateWiseExpense)
//           .sort()
//           .map((date) => dateWiseExpense[date]),
//         fill: false,
//         backgroundColor: 'rgba(255,99,132,0.5)',
//         borderColor: 'rgba(255,99,132,1)',
//         tension: 0.1,
//       },
//     ],
//   };





//   const pieChartData = {
//     labels: Object.keys(categoryWiseExpense),
//     datasets: [
//       {
//         // label: 'Category-wise Expense',
//         data: Object.values(categoryWiseExpense),
//         backgroundColor: [
//           '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40', '#C9CBCF'
//         ],
//         borderColor: '#fff',
//         borderWidth: 1,
//       },
//     ],
//   };


//   const showExpenseModal = () => { setIsExpenseModalVisible(true); };
//   const showIncomeModal = () => { setIsIncomeModalVisible(true); };
//   const handleExpenseCancel = () => { setIsExpenseModalVisible(false); };
//   const handleIncomeCancel = () => { setIsIncomeModalVisible(false); };
//   const onFinish = (values, type) => {
//     const newTransaction = {
//       type: type,
//       date: values.date.format("YYYY-MM-DD"),
//       amount: parseFloat(values.amount),
//       tag: values.tag,
//       name: values.name,
//     };
//     addTransaction(newTransaction);
//   };
//   async function addTransaction(transaction, many) {
//     try {
//       const docRef = await addDoc(
//         collection(db, `users/${user.uid}/transactions`),
//         transaction
//       );
//       if (!many) toast.success("Transaction added successfully");
//       let newArr = transactions;
//       newArr.push(transaction);
//       setTransactions(newArr);
//       fetchTransactions();
//     } catch (e) {
//       if (!many) toast.error("Error adding transaction");
//     }
//   }
//   useEffect(() => { if (user) fetchTransactions(); }, [user]);
//   useEffect(() => { calculateBalance(); }, [transactions]);
//   const calculateBalance = () => {
//     let incomeTotal = 0;
//     let expensesTotal = 0;
//     transactions.forEach((transaction) => {
//       if (transaction.type === "income") {
//         incomeTotal += transaction.amount;
//       } else {
//         expensesTotal += transaction.amount;
//       }
//     });
//     setIncome(incomeTotal);
//     setExpenses(expensesTotal);
//     setCurrentBalance(incomeTotal - expensesTotal);
//   };
//   async function fetchTransactions() {
//     setLoading(true);
//     if (user) {
//       const q = query(collection(db, `users/${user.uid}/transactions`));
//       const querySnapshot = await getDocs(q);
//       let transactionsArray = [];
//       querySnapshot.forEach((doc) => {
//         transactionsArray.push(doc.data());
//       });
//       setTransactions(transactionsArray);
//       // toast.success("Transactions Fetched!");
//     }
//     setLoading(false);
//   }

//   return (
//     <>
//       <Header />
//       <Cards
//         income={income}
//         expense={expense}
//         totalBalance={totalBalance}
//         showExpenseModal={showExpenseModal}
//         showIncomeModal={showIncomeModal}
//       />
//       {/* --- Charts Section --- */}
//       <div
//         className="my-row"
//         style={{
//           width: '100%',
//           marginTop: '2rem',
//           display: 'flex',
//           flexDirection: 'row',
//           justifyContent: 'space-between',
//           alignItems: 'stretch',
//           gap: '1rem',
//           flexWrap: 'wrap', // Wrap on smaller screens
//         }}
//       >
//         {/* Line Chart - 60% */}
//         <div
//           className="my-card"
//           style={{
//             flex: 6,
//             minWidth: '300px',
//             background: '#fff',
//             padding: '20px 16px 20px 8px',
//             display: 'flex',
//             flexDirection: 'column',
//             alignItems: 'center',
//             height: 370,
//             boxSizing: 'border-box',
//             boxShadow: 'var(--shadow)',
//           }}
//         >
//           <h3 style={{ textAlign: 'center', marginBottom: 16 }}>Date-wise Expense</h3>
//           <div style={{ width: '100%', height: 280 }}>
//             <Line
//               data={lineChartData}
//               options={{
//                 maintainAspectRatio: false,
//                 plugins: { legend: { display: false } },
//                 responsive: true,
//               }}
//             />
//           </div>
//         </div>

//         {/* Pie Chart - 40% */}
//         <div
//           className="my-card"
//           style={{
//             flex: 4,
//             minWidth: '300px',
//             background: '#fff',
//             padding: '20px 8px 20px 16px',
//             display: 'flex',
//             flexDirection: 'column',
//             alignItems: 'center',
//             height: 370,
//             boxSizing: 'border-box',
//             boxShadow: 'var(--shadow)',
//           }}
//         >
//           <h3 style={{ textAlign: 'center', marginBottom: 16 }}>Category-wise Expense</h3>
//           <div style={{ width: '100%', height: 280 }}>
//             <Pie
//               data={pieChartData}
//               options={{
//                 maintainAspectRatio: false,
//                 plugins: { legend: { position: 'bottom' } },
//                 responsive: true,
//               }}
//             />
//           </div>
//         </div>
//       </div>
//       {/* --- End Charts Section --- */}
//       {loading ? (
//         <div className="spinner-overlay">
//           <div className="spinner"></div>
//         </div>
//       ) : (
//         <TransactionsTable
//           transactions={transactions}
//           addTransaction={addTransaction}
//           fetchTransactions={fetchTransactions}
//         />
//       )}
//       <AddExpenseModal
//         isExpenseModalVisible={isExpenseModalVisible}
//         handleExpenseCancel={handleExpenseCancel}
//         onFinish={onFinish}
//       />
//       <AddIncomeModal
//         isIncomeModalVisible={isIncomeModalVisible}
//         handleIncomeCancel={handleIncomeCancel}
//         onFinish={onFinish}
//       />
//     </>
//   );
// }

// export default Dashboard;




import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import Cards from '../components/cards'
import AddExpenseModal from '../components/Modals/addExpense';
import AddIncomeModal from '../components/Modals/addIncome';
import { addDoc, collection, getDocs, query } from 'firebase/firestore';
import { auth, db } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { toast } from 'react-toastify';
import TransactionsTable from '../components/TransactionsTable';
import { Line, Pie } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, PointElement, LineElement, ArcElement, Tooltip, Legend } from 'chart.js';
import { deleteDoc, doc, writeBatch } from "firebase/firestore";


Chart.register(CategoryScale, LinearScale, PointElement, LineElement, ArcElement, Tooltip, Legend);

function Dashboard() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [user] = useAuthState(auth);
  const [isExpenseModalVisible, setIsExpenseModalVisible] = useState(false);
  const [isIncomeModalVisible, setIsIncomeModalVisible] = useState(false);
  const [income, setIncome] = useState(0);
  const [expense, setExpenses] = useState(0);
  const [totalBalance, setCurrentBalance] = useState(0);

  // 1. Get the latest 10 expense transactions (sorted by date, newest first)
  const latestExpenseTransactions = [...transactions]
    .filter(tran => tran.type === 'expense')
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 10);

  // 2. Group those 10 by date (so chart can sum same-day expenses)
  const dateWiseExpense = {};
  latestExpenseTransactions.forEach((transaction) => {
    const date = transaction.date;
    dateWiseExpense[date] = (dateWiseExpense[date] || 0) + transaction.amount;
  });

  // 3. Prepare chart data for the latest 10 transactions, grouped by date
  const lineChartData = {
    labels: Object.keys(dateWiseExpense).sort(), // sorted dates
    datasets: [
      {
        label: 'Expense',
        data: Object.keys(dateWiseExpense)
          .sort()
          .map((date) => dateWiseExpense[date]),
        fill: false,
        backgroundColor: 'rgba(255,99,132,0.5)',
        borderColor: 'rgba(255,99,132,1)',
        tension: 0.1,
      },
    ],
  };

  // Pie chart (category-wise, all expenses)
  const categoryWiseExpense = {};
  transactions.forEach((transaction) => {
    if (transaction.type === 'expense') {
      const tag = transaction.tag || 'Other';
      categoryWiseExpense[tag] = (categoryWiseExpense[tag] || 0) + transaction.amount;
    }
  });

  const pieChartData = {
    labels: Object.keys(categoryWiseExpense),
    datasets: [
      {
        data: Object.values(categoryWiseExpense),
        backgroundColor: [
          '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40', '#C9CBCF'
        ],
        borderColor: '#fff',
        borderWidth: 1,
      },
    ],
  };

  const showExpenseModal = () => { setIsExpenseModalVisible(true); };
  const showIncomeModal = () => { setIsIncomeModalVisible(true); };
  const handleExpenseCancel = () => { setIsExpenseModalVisible(false); };
  const handleIncomeCancel = () => { setIsIncomeModalVisible(false); };
  const onFinish = (values, type) => {
    const newTransaction = {
      type: type,
      date: values.date.format("YYYY-MM-DD"),
      amount: parseFloat(values.amount),
      tag: values.tag,
      name: values.name,
    };
    addTransaction(newTransaction);
  };
  async function addTransaction(transaction, many) {
    try {
      await addDoc(
        collection(db, `users/${user.uid}/transactions`),
        transaction
      );
      if (!many) toast.success("Transaction added successfully");
      let newArr = transactions;
      newArr.push(transaction);
      setTransactions(newArr);
      fetchTransactions();
    } catch (e) {
      if (!many) toast.error("Error adding transaction");
    }
  }
  useEffect(() => { if (user) fetchTransactions(); }, [user]);
  useEffect(() => { calculateBalance(); }, [transactions]);
  const calculateBalance = () => {
    let incomeTotal = 0;
    let expensesTotal = 0;
    transactions.forEach((transaction) => {
      if (transaction.type === "income") {
        incomeTotal += transaction.amount;
      } else {
        expensesTotal += transaction.amount;
      }
    });
    setIncome(incomeTotal);
    setExpenses(expensesTotal);
    setCurrentBalance(incomeTotal - expensesTotal);
  };
  async function fetchTransactions() {
    setLoading(true);
    if (user) {
      const q = query(collection(db, `users/${user.uid}/transactions`));
      const querySnapshot = await getDocs(q);
      let transactionsArray = [];
      querySnapshot.forEach((doc) => {
        transactionsArray.push(doc.data());
      });
      setTransactions(transactionsArray);
    }
    setLoading(false);
  }

  async function handleResetBalance() {
    if (!user) return;
    setLoading(true);
    try {
      // Get all transaction docs for the user
      const q = query(collection(db, `users/${user.uid}/transactions`));
      const querySnapshot = await getDocs(q);

      // Use Firestore batch to delete all docs (max 500 per batch)
      const batch = writeBatch(db);
      querySnapshot.forEach((docSnap) => {
        batch.delete(doc(db, `users/${user.uid}/transactions`, docSnap.id));
      });
      await batch.commit();

      // Clear local state
      setTransactions([]);
      setIncome(0);
      setExpenses(0);
      setCurrentBalance(0);

      toast.success("All transactions deleted and balance reset!");
    } catch (err) {
      toast.error("Failed to reset balance: " + err.message);
    }
    setLoading(false);
  }

  return (
    <>
      <Header />
      <Cards
        income={income}
        expense={expense}
        totalBalance={totalBalance}
        showExpenseModal={showExpenseModal}
        showIncomeModal={showIncomeModal}
        onResetBalance={handleResetBalance}
      />

      {/* --- Charts Section --- */}
      <div
        className="my-row"
        style={{
          width: '100%',
          marginTop: '2rem',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'stretch',
          gap: '1rem',
          flexWrap: 'wrap',
        }}
      >
        {/* Line Chart - 60% */}
        <div
          className="my-card"
          style={{
            flex: 6,
            minWidth: '300px',
            background: '#fff',
            padding: '20px 16px 20px 8px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            height: 370,
            boxSizing: 'border-box',
            boxShadow: 'var(--shadow)',
          }}
        >
          <h3 style={{ textAlign: 'center', marginBottom: 16 }}>Date-wise Expense (Latest 10)</h3>
          <div style={{ width: '100%', height: 280 }}>
            <Line
              data={lineChartData}
              options={{
                maintainAspectRatio: false,
                plugins: { legend: { display: false } },
                responsive: true,
              }}
            />
          </div>
        </div>
        {/* Pie Chart - 40% */}
        <div
          className="my-card"
          style={{
            flex: 4,
            minWidth: '300px',
            background: '#fff',
            padding: '20px 8px 20px 16px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: 370,
            boxSizing: 'border-box',
            boxShadow: 'var(--shadow)',
          }}
        >
          <h3 style={{ textAlign: 'center', marginBottom: 16 }}>Category-wise Expense</h3>
          <div style={{ width: '100%', height: 280, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {Object.keys(categoryWiseExpense).length === 0 ? (
              <span style={{ color: '#666', fontSize: '1.1rem', textAlign: 'center' }}>
                seems like you haven't spent anything till now
              </span>
            ) : (
              <Pie
                data={pieChartData}
                options={{
                  maintainAspectRatio: false,
                  plugins: { legend: { position: 'bottom' } },
                  responsive: true,
                }}
              />
            )}
          </div>
        </div>
      </div>
      {/* --- End Charts Section --- */}
      {loading ? (
        <div className="spinner-overlay">
          <div className="spinner"></div>
        </div>
      ) : (
        <TransactionsTable
          transactions={transactions}
          addTransaction={addTransaction}
          fetchTransactions={fetchTransactions}
        />
      )}
      <AddExpenseModal
        isExpenseModalVisible={isExpenseModalVisible}
        handleExpenseCancel={handleExpenseCancel}
        onFinish={onFinish}
      />
      <AddIncomeModal
        isIncomeModalVisible={isIncomeModalVisible}
        handleIncomeCancel={handleIncomeCancel}
        onFinish={onFinish}
      />
    </>
  );
}

export default Dashboard;
