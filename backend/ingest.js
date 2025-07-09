const fs = require('fs');
const csv = require('csv-parser');
const db = require('./config/db');

const results = [];

// First, check if any rows already exist in the threats table
db.query('SELECT COUNT(*) AS count FROM threats', (err, res) => {
  if (err) {
    console.error('Error checking existing data:', err);
    process.exit(1);
  }

  if (res[0].count > 0) {
    console.log('Threats table already has data. Skipping ingestion.');
    process.exit(0);
  }

  // If table is empty, proceed with ingestion
  fs.createReadStream('./Cybersecurity_Dataset.csv')
    .pipe(csv())
    .on('data', (data) => results.push(data))
    .on('end', () => {
      const insertQuery = `
        INSERT INTO threats (
          threat_category, iocs, threat_actor, attack_vector, geo_location,
          forum_sentiment, severity_score, predicted_category,
          defense_mechanism, risk_level, description, keywords,
          named_entities, topic_label, word_count
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;

      results.forEach((row) => {
        db.query(insertQuery, [
          row['Threat Category'],
          row['IOCs (Indicators of Compromise)'],
          row['Threat Actor'],
          row['Attack Vector'],
          row['Geographical Location'],
          parseFloat(row['Sentiment in Forums']),
          parseInt(row['Severity Score']),
          row['Predicted Threat Category'],
          row['Suggested Defense Mechanism'],
          parseInt(row['Risk Level Prediction']),
          row['Cleaned Threat Description'],
          row['Keyword Extraction'],
          row['Named Entities (NER)'],
          row['Topic Modeling Labels'],
          parseInt(row['Word Count']),
        ]);
      });

      console.log('Data inserted successfully');
    });
});











// const fs = require('fs');
// const csv = require('csv-parser');
// const db = require('./config/db');

// const results = [];

// fs.createReadStream('./Cybersecurity_Dataset.csv')
//   .pipe(csv())
//   .on('data', (data) => results.push(data))
//   .on('end', () => {
//     const insertQuery = `
//       INSERT INTO threats (
//         threat_category, iocs, threat_actor, attack_vector, geo_location,
//         forum_sentiment, severity_score, predicted_category,
//         defense_mechanism, risk_level, description, keywords,
//         named_entities, topic_label, word_count
//       )
//       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
//     `;

//     results.forEach((row) => {
//       db.query(insertQuery, [
//         row['Threat Category'],
//         row['IOCs (Indicators of Compromise)'],
//         row['Threat Actor'],
//         row['Attack Vector'],
//         row['Geographical Location'],
//         parseFloat(row['Sentiment in Forums']),
//         parseInt(row['Severity Score']),
//         row['Predicted Threat Category'],
//         row['Suggested Defense Mechanism'],
//         parseInt(row['Risk Level Prediction']),
//         row['Cleaned Threat Description'],
//         row['Keyword Extraction'],
//         row['Named Entities (NER)'],
//         row['Topic Modeling Labels'],
//         parseInt(row['Word Count']),
//       ]);
//     });

//     console.log('Data inserted successfully');
//   });
