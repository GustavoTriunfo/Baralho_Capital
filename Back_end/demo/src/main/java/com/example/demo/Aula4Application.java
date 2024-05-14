package com.example.demo;


import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.*;


/*
  A anotação @SpringBootApplication é uma combinação de três anotações diferentes fornecidas pelo Spring Framework:
  @Configuration, @EnableAutoConfiguration, e @ComponentScan. Ela é comumente usada na classe principal de uma aplicação
  Spring Boot para simplificar a configuração e inicialização da aplicação.

  Explicação mais detalhada sobre cada uma das anotações que compõem @SpringBootApplication:

  @Configuration: Indica que a classe é uma fonte de definições de beans para o contexto do Spring. Classes anotadas com
  @Configuration são usadas para definir beans usando o método @Bean. Esta anotação é usada em classes que definem
  configurações para o contexto do Spring.

  @EnableAutoConfiguration: Habilita a configuração automática do Spring Boot. O Spring Boot tenta adivinhar automaticamente
  a configuração da aplicação com base nas dependências do classpath e em outras configurações. Isso significa que muitas
  configurações são feitas automaticamente sem a necessidade de configuração manual.

  @ComponentScan: Essa anotação diz ao Spring para procurar por componentes (como @Component, @Service, @Repository, @Controller, etc.)
  no pacote da classe anotada e em subpacotes. O Spring registra esses componentes e os torna disponíveis para injeção de
  dependência e outras funcionalidades.
*/
@SpringBootApplication

/*
Combina as anotações @Controller e @ResponseBody (Quando um método de um controlador Spring é anotado com @ResponseBody,
o valor retornado por esse método é convertido automaticamente para o formato de saída desejado (como JSON ou XML) e
inserido diretamente no corpo da resposta HTTP.). Mapeia os métodos para endpoints REST e converte automaticamente as
respostas para JSON ou XML.
 */
@RestController

/*
Especifica o prefixo de URL para todos os endpoints do controlador. Neste caso, todos os endpoints estão sob o caminho /api/tasks.
 */
@RequestMapping("/api/tasks")
public class Aula4Application {

	/*
	Ponto de Entrada: É o método principal que inicia a execução da aplicação Spring Boot.

	Este método estático da classe SpringApplication é usado para iniciar a aplicação Spring Boot.
	Ele espera dois argumentos: a classe principal da aplicação (Aula3Application.class) e os argumentos da linha de comando (args).

	Aula3Application.class:	Representa a classe principal da aplicação Spring Boot. Essa classe é anotada com @SpringBootApplication
	e, portanto, é a classe de configuração principal da aplicação.

	args: É uma matriz de strings que contém os argumentos da linha de comando que podem ser passados durante a inicialização da aplicação Spring Boot.
	 */
	public static void main(String[] args) {
		SpringApplication.run(Aula4Application.class, args);
	}


}