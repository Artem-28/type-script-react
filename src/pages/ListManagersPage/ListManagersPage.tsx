import React, {useEffect} from 'react';
import { fetchListManagers } from '../../store/actions/actionListManagers';
import { fetchMetadate } from '../../store/actions/actionMetadata';



const ListManagersPage: React.FC = () => {
    useEffect(() => {
       fetchMetadate('managers')
       fetchListManagers()
    }, [])
    return (
        <h1>List MAnagers</h1>
    )
    
}


export default ListManagersPage