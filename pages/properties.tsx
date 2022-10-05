import { ArrowBackIos, ArrowForwardIos, Tune } from "@mui/icons-material";
import { Button } from "@mui/material";
import { useRouter } from "next/router";
import React from "react";
import { useSelector } from "react-redux";
import OjarhCard from "../components/Card";
import Layout from "../components/Layout";
import { CardLoader } from "../components/Loader";
import { SearchProperties } from "../components/Search";
import { RootState } from "../store";

const perPage = 18
function Page() {
	const { data, state } = useSelector((store: RootState) => store.searchSlice.property)
	const [page, setPage] = React.useState(0)
	const [showFilter, setShowFilter] = React.useState(true)

	return (
		<Layout>
			<div className='w-full'>
				<div>
					<div className="flex justify-end m-1 lg:mr-10">
						<Tune htmlColor={showFilter ? '' : 'red'} onClick={() => setShowFilter(!showFilter)} />
					</div>
					<div hidden={!showFilter}>
						<SearchProperties />
					</div>
				</div>
				<div className="my-2">
					{state === 'pending' && <div>
						<CardLoader />
					</div>}
					{(state === 'success' && data !== undefined && data.length > 0) && <div className=" sm:grid grid-cols-2 lg:grid-cols-3 gap-8 items-center justify-center mx-auto 2xl:max-w-[50vw] xl:max-w-[70vw] max-w-[90vw]">
						{data
							.slice(page * perPage, page === 0 ? perPage : (page + 1) * perPage)
							.map((s, i) => <div key={i}>
								<OjarhCard data={s} />
							</div>)}
					</div>}
					{
						(state === 'success' && data !== undefined && data.length === 0) && <div className="h-20vh flex flex-col justify-center items-center">
							<div className="text-gray-500">
								NO MATCH RECORD
							</div>
						</div>
					}
					{
						(state === 'success' && data !== undefined && data.length > perPage) &&
						<div className="flex justify-around my-2 ">
							<Button
								variant="outlined"
								startIcon={<ArrowBackIos fontSize="small" />}
								onClick={() => setPage(page - 1)}
								disabled={page === 0}
							>
								{'Prev'}
							</Button>
							<Button
								variant="outlined"
								endIcon={<ArrowForwardIos fontSize="small" />}
								onClick={() => setPage(page + 1)}
								disabled={data.slice(page * perPage, page === 0 ? perPage : (page + 1) * perPage).length < perPage}
							>
								{'Next'}
							</Button>
						</div>
					}
				</div>
			</div>
		</Layout>
	);
}

export default Page;
