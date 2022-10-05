import { DataGrid, DataGridProps } from "@mui/x-data-grid"
import { LoadState } from "../Typing"
import Loader from "./Loader"

const GridTable = (props: DataGridProps & React.RefAttributes<HTMLDivElement> & { state: LoadState }) => {
    return <>
        {props.state !== 'pending' && <DataGrid
            {...props}
        />}
        {props.state === 'pending' && <div>
            <Loader />
        </div>}
    </>
}
export default GridTable