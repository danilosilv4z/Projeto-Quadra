const db = require('../config/database');

const getAllAvisos = async (req, res) => {
  try {
    const [avisos] = await db.query(`
      SELECT 
        a.id, 
        a.titulo, 
        a.descricao, 
        a.createdAt, 
        a.updatedAt,
        u.name as adminName
      FROM avisos a
      JOIN users u ON a.adminId = u.id
      ORDER BY a.createdAt DESC
    `);

    res.json(avisos);
  } catch (error) {
    console.error('Erro ao buscar avisos:', error);
    res.status(500).json({ message: 'Erro no servidor' });
  }
};

const createAviso = async (req, res) => {
  try {
    const { titulo, descricao } = req.body;
    const adminId = req.userId;

    if (!titulo || !descricao) {
      return res.status(400).json({ message: 'Título e descrição são obrigatórios' });
    }

    const [result] = await db.query(
      'INSERT INTO avisos (titulo, descricao, adminId) VALUES (?, ?, ?)',
      [titulo, descricao, adminId]
    );

    res.status(201).json({ 
      message: 'Aviso criado com sucesso!',
      avisoId: result.insertId 
    });

  } catch (error) {
    console.error('Erro ao criar aviso:', error);
    res.status(500).json({ message: 'Erro no servidor' });
  }
};

const deleteAviso = async (req, res) => {
  try {
    const { id } = req.params;

    const [result] = await db.query('DELETE FROM avisos WHERE id = ?', [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Aviso não encontrado' });
    }

    res.json({ message: 'Aviso deletado com sucesso!' });

  } catch (error) {
    console.error('Erro ao deletar aviso:', error);
    res.status(500).json({ message: 'Erro no servidor' });
  }
};

module.exports = { getAllAvisos, createAviso, deleteAviso };