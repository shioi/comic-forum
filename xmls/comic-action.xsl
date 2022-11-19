<?xml version="1.0" encoding="UTF-8"?>

<xsl:stylesheet version="1.0"
xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

<xsl:template match="/">
<html>
    <body bgcolor="skyblue">
        <h2>Comics </h2>
        <xsl:apply-templates/>
        </body>
</html>
</xsl:template>


<xsl:template match="comiclist">
            <table border="2.5">
                <tr bgcolor="#9acd32">
                    <th>Title</th>
                    <th>Status</th>
                    <th>Number of Chapters</th>
                    <th>Number of Volumes</th>
                    <th>Authors</th>
                    <th>Tags</th>
                </tr>
                <xsl:for-each select="comic">
                <xsl:sort select="status"/>       
                <tr>
                    
                    <td><xsl:value-of select="name"/></td>
                    <td><xsl:value-of select="status"/></td>
                    <xsl:choose>
                    <xsl:when test="status = 'Finished'">
                    <td><xsl:value-of select="Chapter_Number"/></td>
                    <td><xsl:value-of select="Volume_Number"/></td>
                </xsl:when>    
                <xsl:otherwise>
                    <td>Unknown</td>
                    <td>Unknown</td>    
                </xsl:otherwise>
                </xsl:choose>   
                                    <xsl:for-each select="Authors">
                <tr>
                    <td>
                        <xsl:value-of select="Author_Name"/></td>
                </tr>
                
            
                    </xsl:for-each>
                    <td>
                    <tr>
                        <xsl:for-each select="Tags">
                            <xsl:if test="@number_of_tags &lt;= '3'">
                                <td style="background-color:red">
                                    <xsl:value-of select="tag"/>
                                </td>
                            </xsl:if>
                        <xsl:if test="@number_of_tags &gt;= '4'">
                            <td style="background-color: blue">
                                <xsl:value-of select='tag'/>
                            </td>
                        </xsl:if>
                            
                        </xsl:for-each>
                    </tr>
                </td>
                
                </tr>
                </xsl:for-each>
            </table>
    </xsl:template>


</xsl:stylesheet>
