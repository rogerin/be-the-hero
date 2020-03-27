const crypto = require('crypto');
const connection = require('../database/connection');

module.exports  = {

    async listAll(req, res) {
        const { page = 1 } = await req.query;
        const [count] = await connection('incidents').count();
        
        const incidents = await 
            connection('incidents')
            .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
            .limit(5)
            .offset( (page - 1) * 5 )
            //.join('ongs')
            .select([
                'incidents.*',
                'ongs.name',
                'ongs.email',
                'ongs.whatsapp',
                'ongs.city',
                'ongs.uf'
            ]);
        
        res.header('X-Total-Count', count['count(*)']);
        return res.json(incidents)
    },

    async profile(req,res) {
        const ong_id = req.headers.authorization;

        const incidents = await connection('incidents')
            .where('ong_id', ong_id)
            .select('*');

        return res.json(incidents)
    },

    async create(req, res){
        const { title,  description, value } = req.body;
        const ong_id = req.headers.authorization;
        console.log(ong_id);
        const result = await connection('incidents')
            .insert(
                {
                    title,  description, value, ong_id
                }
            )
    
        return res.json(result)
    },

    async delete(req,res) {
        const { id } = req.params;
        const ong_id = req.headers.authorization;
        console.log(ong_id)
        const incident = await connection('incidents')
            .where('id', id)
            .select('ong_id')
            .first();
        try {
            if((incident.ong_id !== ong_id) || incident == 'undefined' ){
                return res.status(401).json({ error : 'Operation not permission.'})
            }

            await connection('incidents').where('id', id).delete();

            return res.status(204).send();
        } catch (error) {
            return res.status(401).json({ error : 'Operation not permission.'})        
        }
        
    }
}