module.exports = function checkRole(...rolesPermitidos) {
  return (req, res, next) => {
    const { role } = req.usuario;

    if (!rolesPermitidos.includes(role)) {
      return res.status(403).json({ erro: 'Acesso negado: permissão insuficiente' });
    }

    next();
  };
};
