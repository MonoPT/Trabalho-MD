import {pool} from '@/db/conn'

export default defineEventHandler(async (event) => {
    const filter = parseInt(event.context.params.filter);
    const order = parseInt(event.context.params.order);

    let response;

    if(filter === 0 && order === 0) { ///Get list of all produts
        try { //Insert
            const currentDBS = await pool.query(`
                SELECT * FROM produtos ORDER BY id DESC;
            `);
            
            response = currentDBS.rows
        } catch (err) {
            console.log(err)
        }
    }
    
    
    


    return response;
    
});