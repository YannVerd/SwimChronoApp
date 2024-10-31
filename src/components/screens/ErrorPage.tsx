import PageWrapper from "../common/PageWrapper";



export default function ErrorPage({message = 'Navigation Error'} : {message?: string}){
    return(
        <>
            <PageWrapper title="An Error Occured">
                <h2>{message}</h2>
            </PageWrapper>
        </>
        
        
    )
}