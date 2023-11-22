const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  try {
    const tagData = await Product.findAll({
      include: [{ model: Product }, { model: ProductTag }]
    });
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const tagData = await Product.findByPk(req.params.id, {
      include: [{ model: Product }, { model: ProductTag }]
    });
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', (req, res) => {
  Tag.create ({
    tag_name: req.body.name,
  })
  .then((newTag) => {
    res.json(newTag);
  })
  .catch((err) => {
    res.json(err);
  })
});

router.put('/:id', (req, res) => {
  Tag.update(
    {
      tag_name: req.body.name,
    }, 
    {
      where: {
        id: req.params.id,
      },
    }
  )
  .then ((updatedTag) => {
    res.json(updatedTag);
  })
  .catch((err) => res.json(err));
});

router.delete('/:id', (req, res) => {
  Tag.destroy({
    where: {
      id: req.params.id,
    },
})
.then((deletedTag) => {
  res.json(deletedTag);
})
.catch((err) => res.json(err));
});

module.exports = router;
