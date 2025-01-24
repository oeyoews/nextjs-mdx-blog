"use client"

import { Button, Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { createElement, useState } from 'react'

export default function ConfirmButton({ url }: { url: any }) {
	let [isOpen, setIsOpen] = useState(false)

	function open() {
		setIsOpen(true)
	}

	function openNewPage() {
		setIsOpen(false)
		window.open(url[0], "_blank")
	}

	function close() {
		setIsOpen(false)
	}
	const btnClass = "inline-flex items-center gap-2 rounded-md bg-black dark:bg-black/9 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-white/10 focus:outline-none data-[focus]:outline-1 data-[focus]:outline-white cursor-pointer"

	return (
		<>
			{createElement(url[1], { className: "size-5 block cursor-pointer", onClick: open })}

			<Dialog open={isOpen} as="div" className="relative z-10 focus:outline-none" onClose={close} __demoMode>
				<div className="fixed inset-0 z-10 w-screen overflow-y-auto">
					<div className="flex min-h-full items-center justify-center p-4">
						<DialogPanel
							transition
							className="w-full max-w-md rounded-xl bg-white/5 dark:bg-black/10 p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0 dark:border-none border"
						>
							<DialogTitle as="h3" className="text-base/7 font-medium dark:text-white text-black">
								提示
							</DialogTitle>
							<p className="mt-2 text-sm/6 dark:text-white/50 text-black">
								确认要离开当前页面进入<span className='underline mx-0.5'>{url[0]}</span>吗？
							</p>
							<div className="mt-4 flex justify-end gap-2">
								<Button onClick={close} className={btnClass}>
									取消
								</Button>
								<Button
									className={btnClass}
									onClick={openNewPage}
								>
									确认
								</Button>
							</div>
						</DialogPanel>
					</div>
				</div>
			</Dialog>
		</>
	)
}
