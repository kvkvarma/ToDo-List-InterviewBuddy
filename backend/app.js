const express = require('express');
const app = express();
const { createClient } = require('@supabase/supabase-js');
const port = process.env.port || 8073;  
require('dotenv').config();
const { v4: uuidv4 } = require('uuid'); 
const cors = require('cors');

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send("Hii, Hello There.......")
}); 

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

app.post('/addTask', async (req, res) => {
    const description = req.body.x;
    const id = uuidv4(); 
    try {
        await supabase.from('todo').insert([{ id, description }]);
        res.send('Task added');
    } catch (error) {
        console.log('Error adding task:', error);
        res.status(500).send('Error adding task');
    }
});

app.get('/api/data', async (req, res) => {
    try {
        const { data, error } = await supabase.from('todo').select('*');
        if (error) {
            console.error('Supabase error:', error);
            return res.status(500).send('Error fetching tasks');
        }
        res.json(data);
    } catch (err) {
        console.error('Server error:', err);
        res.status(500).send('Error fetching tasks');
    }
});

app.delete('/deleteTask/:refId', async (req, res) => {
    const { refId } = req.params;
    console.log('Deleting task with ID:', refId);
    try {
        const { data, error } = await supabase
            .from('todo')
            .delete()
            .eq('id', refId);

        if (error) {
            console.log('Error:', error); 
            return res.status(500).json({ error: 'Failed to delete task' });
        }

        console.log('Deleted task:', data);
        res.status(200).send('Task deleted successfully');
        
    } catch (error) {
        console.log('Error in deletion:', error);
        res.status(500).send('Error in deleting task');
    }
});

app.put('/updateTask/:id', async (req, res) => {
    const { id } = req.params;
    const { description } = req.body;

    try {
        const { data, error } = await supabase
            .from('todo')
            .update({ description })
            .eq('id', id);

        if (error) {
            console.log('Error:', error);
            return res.status(500).json({ error: 'Failed to update task' });
        }

        console.log('Updated task:', data);
        res.status(200).send('Task updated successfully');
    } catch (error) {
        console.log('Error in update:', error);
        res.status(500).send('Error updating task');
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
