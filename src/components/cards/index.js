import React from 'react'
import { Card, Row } from 'antd'
import Button from '../Button'
import './styles.css'

function Cards({showExpenseModal, showIncomeModal}) {
    return (
        <div>
            <Row className='my-row'>
                <Card bordered={true} className='my-card'>
                    <h2>Current Balance</h2>
                    <p>₹0</p>
                    <Button blue={true} text="Reset Balance" />
                </Card>

                <Card bordered={true} className='my-card'>
                    <h2>Total Income</h2>
                    <p>₹0</p>
                    <Button blue={true} text="Add Income" onClick={showIncomeModal}/>
                </Card>

                <Card bordered={true} className='my-card'>
                    <h2>Total Expenses</h2>
                    <p>₹0</p>
                    <Button blue={true} text="Add Expenses" onClick={showExpenseModal}/>
                </Card>
            </Row>
        </div>
    )
}

export default Cards