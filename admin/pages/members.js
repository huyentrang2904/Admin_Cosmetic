import React, { useState } from 'react'
import MembersTable from '@/components/Members/MembersTable'
import BaseTemplate from '@/components/BaseTemplate'
import BasicModal from '@/components/Modal/BasicModal'
import AddMember from '@/components/Members/AddMember'

export default function Members() {
    const [openAdd, setOpenAdd] = useState(false)
    return (
        <BaseTemplate>
            <div className="h-full py-4 bg-white">
                {/* <div className="mx-6 text-xl font-bold uppercase">Decripstion</div> */}
                <div className="px-4 sm:px-6 lg:px-8">
                    <div className="sm:flex sm:items-center">
                        <div className="flex sm:flex-auto">
                            <h1 className="mt-1 text-xl font-semibold text-gray-900">
                                Member list
                            </h1>
                        </div>
                        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
                            <button
                                onClick={() => setOpenAdd(true)}
                                type="button"
                                className="inline-flex items-center justify-center px-4 py-2 text-base font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
                            >
                                Add new account
                            </button>
                        </div>
                    </div>
                </div>
                <MembersTable></MembersTable>
            </div>

            <BasicModal open={openAdd} onClose={() => setOpenAdd(false)}>
                <AddMember open={openAdd} onClose={() => setOpenAdd(false)}/>
            </BasicModal>

        </BaseTemplate>
    )
}
