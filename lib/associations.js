
module.exports = [
    {
        type: 'belongsToMany',
        source: 'Setlist',
        target: 'Song',
        through: 'SetlistSong',
        foreignKey: 'setlistId'
    },
    {
        type: 'belongsToMany',
        source: 'Song',
        target: 'Setlist',
        through: 'SetlistSong',
        foreignKey: 'songId'
    }
];