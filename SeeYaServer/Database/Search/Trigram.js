import { where, fn, col, Op, literal } from 'sequelize';

export default options => {
  const {
    targetColumn,
    minScore = 0.10,
    searchArgs: { search, direction, orderby }
  } = options;
  const config = {}
  const searching = search !== undefined;
  if (searching) {
    config.attributes = {
      include: [
        [
          fn(
            'similarity',
            col(targetColumn),
            search
          ),
          'score',
        ],
      ],
    };
    config.where = [
      where(
        fn(
          'similarity',
          col(targetColumn),
          search
        ),
        { [Op.gt]: minScore }
      ),
    ];
    if (!orderby) {
      config.order = [[literal('score'), direction || 'DESC']];
    }
  }
  if (orderby) {
    config.order = [[orderby, direction || 'ASC']];
  }
  return config;
}