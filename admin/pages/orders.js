import React, { useState } from 'react'
import BaseTemplate from '@/components/BaseTemplate'
import OrdersTable from '@/components/Orders/OrdersTable'

export default function Orders() {
    return (
        <BaseTemplate>
            <div className="h-full py-4 bg-white">
                {/* <div className="mx-6 text-xl font-bold uppercase">Decripstion</div> */}
                <div className="px-4 sm:px-6 lg:px-8">
                    <div className="sm:flex sm:items-center">
                        <div className="flex sm:flex-auto">
                            <h1 className="mt-1 text-xl font-semibold text-gray-900">
                                Brand List
                            </h1>
                        </div>
                    </div>
                </div>
                <OrdersTable></OrdersTable>
            </div>

        </BaseTemplate>
    )
}
