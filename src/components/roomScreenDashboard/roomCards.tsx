import {Button, Typography, Container, Box} from "@mui/material";

//This will produce buttons for the user to select


const roomCards = () => {

    return(
        <>
            <Box >
                <Button variant='outlined'
                        color='primary'
                        disableElevation={true}

                        sx={{width: 250, height: 300, fontweight: 'bold',
                            fontSize: 40, border: 10, marginRight:2.5, marginTop:2}}
                >
                    Building A
                </Button>

                <Button variant='outlined'
                        color='primary'
                        disableElevation={true}

                        sx={{width: 250, height: 300, fontweight: 'bold',
                            fontSize: 40, border: 10, marginRight:2.5, marginTop:2}}
                >
                    Building B
                </Button>

                <Button variant='outlined'
                        color='primary'
                        disableElevation={true}

                        sx={{width: 250, height: 300, fontweight: 'bold',
                            fontSize: 40, border: 10, marginRight:2.5, marginTop:2}}
                >
                    Building C
                </Button>

                <Button variant='outlined'
                        color='primary'
                        disableElevation={true}

                        sx={{width: 250, height: 300, fontweight: 'bold',
                            fontSize: 40, border: 10, marginRight:2.5, marginTop:2}}
                >
                    Building D
                </Button>

            </Box>
        </>
    )

}

export default roomCards;