const db = require('../config/db');


exports.getThreats = (req, res) => {
  const { page = 1, limit = 10, category, search } = req.query;
  const offset = (page - 1) * limit;

  let whereClause = 'WHERE 1=1';
  const params = [];

  if (category) {
    whereClause += ' AND threat_category = ?';
    params.push(category);
  }

  if (search) {
    whereClause += ' AND description LIKE ?';
    params.push(`%${search}%`);
  }

  // First, get total count
  const countQuery = `SELECT COUNT(*) as count FROM threats ${whereClause}`;
  db.query(countQuery, params, (err, countResult) => {
    if (err) return res.status(500).json({ error: err.message });

    const totalCount = countResult[0].count;

    // Then get paginated results
    const dataQuery = `SELECT * FROM threats ${whereClause} LIMIT ? OFFSET ?`;
    db.query(dataQuery, [...params, parseInt(limit), parseInt(offset)], (err, results) => {
      if (err) return res.status(500).json({ error: err.message });

      res.json({ data: results, totalCount });
    });
  });
};


exports.getThreatById = (req, res) => {
  const { id } = req.params;
  db.query('SELECT * FROM threats WHERE id = ?', [id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.length === 0) return res.status(404).json({ error: 'Not found' });
    res.json(result[0]);
  });
};

exports.getStats = (req, res) => {
  const stats = {};

  const totalQuery = 'SELECT COUNT(*) as total FROM threats';
  const categoryQuery = 'SELECT threat_category, COUNT(*) as count FROM threats GROUP BY threat_category';
  const severityQuery = 'SELECT severity_score, COUNT(*) as count FROM threats GROUP BY severity_score';

  db.query(totalQuery, (err, totalResult) => {
    if (err) return res.status(500).json({ error: err.message });
    stats.total = totalResult[0].total;

    db.query(categoryQuery, (err, catResult) => {
      if (err) return res.status(500).json({ error: err.message });
      stats.byCategory = catResult;

      db.query(severityQuery, (err, sevResult) => {
        if (err) return res.status(500).json({ error: err.message });
        stats.bySeverity = sevResult;

        res.json(stats);
      });
    });
  });
};




















// exports.getThreats = (req, res) => {
//   const { page = 1, limit = 10, category, search } = req.query;
//   const offset = (page - 1) * limit;

//   let query = 'SELECT * FROM threats WHERE 1=1';
//   const params = [];

//   if (category) {
//     query += ' AND threat_category = ?';
//     params.push(category);
//   }

//   if (search) {
//     query += ' AND description LIKE ?';
//     params.push(`%${search}%`);
//   }

//   query += ' LIMIT ? OFFSET ?';
//   params.push(parseInt(limit), parseInt(offset));

//   db.query(query, params, (err, results) => {
//     if (err) return res.status(500).json({ error: err.message });
//     res.json(results);
//   });
// };