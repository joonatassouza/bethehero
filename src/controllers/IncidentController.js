const connection = require('../database/connection');

module.exports = {
  async create(request, response) {
    const { title, description, value } = request.body;
    const { authorization } = request.headers;
  
    const [id] = await connection('incidents').insert({
      title,
      description,
      value,
      ong_id: authorization
    }, 'id');
  
    return response.json({ id });
  },
  async listAll(request, response) {
    const { page = 1 } = request.query;

    const [{ count }] = await connection('incidents').count();

    const incidents = await connection('incidents')
      .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
      .limit(5)
      .offset((page - 1) * 5)
      .select([
        'incidents.*',
        'ongs.name',
        'ongs.email',
        'ongs.whatsapp',
        'ongs.city',
        'ongs.uf'
      ]);
  
    response.header('X-Total-Count', count);

    return response.json(incidents);
  },
  async delete(request, response) {
    const { id } = request.params;
    const { authorization } = request.headers;

    const incident = await connection('incidents')
      .where('id', id)
      .select('ong_id').
      first();

    if (incident.ong_id !== authorization) {
      return response.status(401).json({ error: 'Operation not permitted.' });
    }

    await connection('incidents').where('id', id).delete();
  
    return response.status(204).send();
  }
}