CREATE DATABASE gerenciamentotarefa;
USE gerenciamentotarefa;

-- -----------------------------------------------------
-- Table usuario
-- -----------------------------------------------------
CREATE TABLE usuario (
  id_usuario INT NOT NULL AUTO_INCREMENT,
  nome VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  PRIMARY KEY (id_usuario))
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table tarefa
-- -----------------------------------------------------
CREATE TABLE tarefa (
  id_tarefa INT NOT NULL AUTO_INCREMENT,
  nome_tarefa VARCHAR(100) NOT NULL,
  descricao_tarefa VARCHAR(100) NOT NULL,
  nome_setor VARCHAR(100) NOT NULL,
  prioridade ENUM('Alta', 'Média', 'Baixa') NOT NULL,
  status ENUM('A Fazer', 'Fazendo', 'Pronto') NOT NULL,
  usuario_id INT NOT NULL,
  PRIMARY KEY (id_tarefa),
  CONSTRAINT fk_tarefa_usuario
    FOREIGN KEY (usuario_id)
    REFERENCES usuario (id_usuario)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;

SELECT * FROM usuario ORDER BY ItName ASC;

SELECT ItName FROM usuario;