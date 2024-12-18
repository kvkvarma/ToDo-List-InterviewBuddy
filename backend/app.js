    const express = require('express');
    const app = express();
    const {createClient} = require('@supabase/supabase-js')
    const port = 8073;  
    require('dotenv').config()

    const cors = require('cors');
    app.use(cors());
    

    app.get('/',(req,res)=>{
        res.send("Hii,Hello There.......")
    })

    const supabaseUrl = process.env.SUPABASE_URL
    const supabaseKey = process.env.SUPABASE_KEY
    const supabase = createClient(supabaseUrl, supabaseKey)

    app.use(express.json())

    app.get('/api/data', async (req, res) => {
        try {
            const { data, error } = await supabase.from('todo').select('*');
            if (error) {
                console.error('Supabase error:', error);
            }
            
            res.json(data);
        } catch (err) {
            console.error('Server error:', err);
        }
    });
    

    app.listen(port, () => {
        console.log(`Server running at http://localhost:${port}`);
    });
