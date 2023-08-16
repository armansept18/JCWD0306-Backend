class Entity {
 constructor(data = []) {
  this.data = [...data];
 }
 getAll(req, res) {
  try {
   if (!this.data.length) throw new Error('no data');
   res.send(this.data);
  } catch (err) {
   console.log(err);
   res.send(err.message);
  }
 }
 getById(req, res) {
  try {
   const { id } = req.params;
   const detail = this.data.find((e) => e.id == id);
   if (!detail) throw new Error('id not found');
   res.send(detail);
  } catch (err) {
   res.status(500).send(err?.message);
  }
 }
 create(req, res) {
  try {
   const newData = { ...req.body };
   const lastid = this.data[this.data.length - 1]?.id;
   newData.id = lastid ? lastid + 1 : 1;
   this.data.push(newData);
   res.send(this.data);
  } catch (err) {
   console.log(err);
   res.status(500).send(err?.message);
  }
 }
 delete(req, res) {
  try {
   const { id } = req.params;
   const index = this.data.findIndex((e) => e.id == id);
   if (index === -1) throw new Error('id not found');
   this.data.splice(index, 1);
   res.send(this.data);
  } catch (err) {
   res.status(500).send(err?.message);
  }
 }
 update(req, res) {
  try {
   const { id } = req.params;
   const index = this.data.findIndex((e) => e.id == id);
   if (index === -1) throw new Error('id not found');
   this.data[index] = { ...this.data[index], ...req.body };
   res.send(this.data);
  } catch (err) {
   res.status(500).send(err?.message);
  }
 }
}

module.exports = Entity;
