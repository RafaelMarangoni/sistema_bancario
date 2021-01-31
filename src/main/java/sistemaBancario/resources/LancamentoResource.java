package sistemaBancario.resources;

import java.util.ArrayList;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import sistemaBancario.dto.LancamentoDTO;
import sistemaBancario.enums.TipoOperacao;
import sistemaBancario.models.Lancamento;
import sistemaBancario.services.LancamentoService;
import sistemaBancario.services.PlanoContaService;

@RestController
@RequestMapping("/lancamentos")
@CrossOrigin("*")
public class LancamentoResource {

	@Autowired
	private LancamentoService lancamentoService;
	@Autowired
	private PlanoContaService planoContaService;
	
    @PostMapping("/")
    public ResponseEntity<?> realizarLancamento(@RequestParam TipoOperacao operacao,@RequestBody LancamentoDTO lancamento){
		try {
			return new ResponseEntity<String>(lancamentoService.realizarOperacao(lancamento,operacao),HttpStatus.OK);
		} catch (ArithmeticException e) {
			return  new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);			
		} catch (NullPointerException e) {
			return  new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);			
		} catch (HttpMessageNotReadableException e) {
			return  new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);			
		} catch (Exception e) {
			return  new ResponseEntity<>(String.format("Houve algum erro nas operações causado pelos dados informados, por favor confira os dados e tente novamente."), HttpStatus.BAD_REQUEST);			
		} 
    }
    
    @GetMapping("/planos-conta/")
    public ResponseEntity<?> getPlanosConta(@RequestParam String login){
    	return new ResponseEntity<ArrayList<?>>(planoContaService.buscar(login),HttpStatus.OK);
    }
    
    @PostMapping("/planos-conta")
    public void PostLancamento(Lancamento lancamento ) {
    	System.out.println("Create");
    }
    
    
    
   
    
  
}