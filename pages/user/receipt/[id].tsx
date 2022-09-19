import Image from "next/image";
import React from "react";

function Page() {
    return (
        <div className='w-full p-2 md:max-w-[70%] mx-auto'>
            <div className='flex justify-between items-center'>
                <Image src='/image/logo.png' height={100} width={100} alt='logo' />
                <h1>Receipt #10-59</h1>
            </div>

            <div className='flex justify-between items-center gap-12'>
                <div>
                    <h1>The Burger Truck</h1>
                    <p className='text-gray-500 '>+9074086235</p>
                    <p className='text-gray-500 '>
                        Lorem ipsum dolor, sit amet consectetur
                    </p>
                    <p className='text-gray-500 '>adipisicing elit. Pariatur, in.</p>
                </div>

                <div>
                    <div>
                        <h1>The Burger Truck</h1>
                        <p className='text-gray-500 '>+9074086235</p>
                        <p className='text-gray-500 '>
                            Lorem ipsum dolor, sit amet consectetur
                        </p>
                        <p className='text-gray-500 '>adipisicing elit. Pariatur, in.</p>
                    </div>
                </div>
            </div>

            <div className='border-b-black border border-transparent border-[2px] mt-4 pb-1 font-bold'>
                <h1>6 items (Qty:91)</h1>
            </div>

            <table
                className='w-full p-2 mx-auto '
                style={{ borderCollapse: "collapse" }}
            >
                <tr className='w-full border-b-gray-300 leading-[2rem] border border-transparent border-[2px]'>
                    <td className='w-[20%]'>
                        <h1 className="text-[1.5rem]">20x</h1>
                    </td>
                    <td>
                        <div className='flex flex-col'>
                            <h2>Bacon Cheeseburger</h2>
                            <p>$8.50</p>
                        </div>
                    </td>

                    <td className='text-[1.2rem] text-right'>$170.00</td>
                </tr>

                <tr className='w-full border-b-gray-300 leading-[2rem] border border-transparent border-[2px]'>
                    <td className='w-[20%]'>
                        <h1 className="text-[1.5rem]">20x</h1>
                    </td>
                    <td>
                        <div className='flex flex-col'>
                            <h2>Bacon Cheeseburger</h2>
                            <p>$8.50</p>
                        </div>
                    </td>

                    <td className='text-[1.2rem] text-right'>$170.00</td>
                </tr>
            </table>

            <div
                className="flex justify-end mt-[1rem]"
            >
                <div className="right-box-content leading-[1.7rem] "
                >
                    <h4>Subtotal: $580.50</h4>
                    <h3 className="red">Discount: (10%) $58.05</h3>
                    <h4>NY Sales Tax: $46.34</h4>
                    <h2>Total: $568.79</h2>
                    <h4>Credit Card: $568.79</h4>
                </div>
            </div>

            <footer>
                <div
                    className="text-center pt-[1rem] border border-t-black border-[2px] border-transparent"
                >
                    <h3>Thanks For Your Patronage</h3>
                    <p className="text-gray-700">May 20 2020, 12:08PM</p>
                </div>
            </footer>
        </div>
    );
}

export default Page;