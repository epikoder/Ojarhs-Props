import { DataGrid, DataGridProps } from "@mui/x-data-grid"
import { LoadState } from "../Typing"
import Loader from "./Loader"

const GridTable = (props: DataGridProps & React.RefAttributes<HTMLDivElement> & { state?: LoadState }) => {
    return <>
        <DataGrid
            {...props}
            loading={props.state === 'pending'}
        />
    </>
}
export default GridTable