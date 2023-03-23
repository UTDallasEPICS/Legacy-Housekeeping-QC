import {Button} from '@mui/material';
import Link from "next/link";


const backButton = () =>{

    const previousPage = () =>{
        <Link href={"/performance"}></Link>
        console.log("Went back");
    }

    return(
        <Button variant='outlined' onClick={previousPage}>
            Back
        </Button>
    );
}

export default backButton;

