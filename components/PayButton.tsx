import { Button } from "@mui/material"

export const PayButton = ({ slug }: { slug: string }) => {
    return <Button variant="contained" sx={{
        borderRadius: 0,
        backgroundColor: 'transparent',
        color: 'black',
        transition: 'all .5s ease-in-out',
        border: 'solid 1px #00000022',
        ":hover": {
            backgroundColor: 'red',
            color: 'white'
        }
    }}
        fullWidth
        disableElevation
        style={{ fontFamily: 'space grotesk' }}>
        PAY
    </Button>
}