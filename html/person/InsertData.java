import java.io.FileInputStream;
import java.io.InputStreamReader;
import java.io.BufferedReader;
import java.io.FileOutputStream;
import java.io.OutputStreamWriter;
import java.io.BufferedWriter;
import java.util.List;
import java.util.ArrayList;

public class InsertData{
    public static void main(String args[]){

        BufferedReader br_csv = null;
        BufferedReader br_csv2 = null;

        //***********read csv file***************
        //the number of people is 30 + title = 31
        List<String[]> person = new ArrayList<String[]>(31);
        List<String[]> person2 = new ArrayList<String[]>(31);

        try{
            br_csv = new BufferedReader(new InputStreamReader(new FileInputStream("profile.csv")));
            
            //the number of entry is 8
            String[] data = new String[8];
            String line;
            int i = 0;
            
            //read csv file => List person
            while((line = br_csv.readLine()) != null){
                data = line.split(",");
                person.add(i,data);
                i++;
            }
        }
        catch(Exception e){
            e.printStackTrace();
        }
        finally{
            try {
                br_csv.close();
            } catch (Exception e) {
                e.printStackTrace();
            }
        }

        //read sentence
        try{
            br_csv2 = new BufferedReader(new InputStreamReader(new FileInputStream("person-text.csv")));
            
            //the number of entry is 6
            String[] data2 = new String[6];
            String line2;
            int i = 0;
            
            //read csv file => List person
            while((line2 = br_csv2.readLine()) != null){
                data2 = line2.split(",");
                person2.add(i,data2);
                i++;
            }
        }
        catch(Exception e){
            e.printStackTrace();
        }
        finally{
            try {
                br_csv2.close();
            } catch (Exception e) {
                e.printStackTrace();
            }
        }

        //************Replacement****************
        //i=0 is title row
        for(int i=1; i<31; i++){            
            BufferedReader br_html = null;
            BufferedWriter bw = null;

            try{
                //source file is person0.html
                br_html = new BufferedReader(new InputStreamReader(new FileInputStream("person0.html"),"UTF-8"));
                if(i<10){
                    bw = new BufferedWriter(new OutputStreamWriter(new FileOutputStream("person0" + (i) + ".html"),"UTF-8"));
                }
                else{
                    bw = new BufferedWriter(new OutputStreamWriter(new FileOutputStream("person" + (i) + ".html"),"UTF-8"));
                }
                String line;

                for(int j=0; j<14; j++){
                    while((line = br_html.readLine()) != null){

                        //replacement
                        String replaceText;
                        if(j<8){
                            replaceText = line.replace("Replace" + (j+1), person.get(i)[j]);
                            bw.write(replaceText);
                            bw.newLine();
                        }
                        else{
                            replaceText = line.replace("Replace" + (j+1), person2.get(i)[j-8]);
                            bw.write(replaceText);
                            bw.newLine();
                        }
                        

                        if(replaceText != line){
                            break;
                        }
                    }
                }
                while((line = br_html.readLine())!= null){
                    bw.write(line);
                    bw.newLine();
                }
            }
            catch(Exception e){
                e.printStackTrace();
            }
            finally{
                if(br_html != null){
                    try {
                    br_html.close();
                    }
                    catch (Exception e) {
                        e.printStackTrace();
                    }
                }
                if(bw != null){
                    try{
                        bw.close();
                    }
                    catch(Exception e){
                        e.printStackTrace();
                    }
                }
            }
        }
    }
}